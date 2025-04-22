import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Word, CreateWordDto, UpdateWordDto } from '../types/word.types';

export class WordsRepository {
    constructor(private db: SQLiteDatabase) {}

    async create(dto: CreateWordDto): Promise<Word> {
        try {
            // Insert word
            const [result] = await this.db.executeSql(
                'INSERT INTO words (word, img) VALUES (?, ?)',
                [dto.word, dto.img]
            );
            const wordId = result.insertId;

            // Add collections if provided
            if (dto.collectionIds?.length) {
                const values = dto.collectionIds
                    .map(() => '(?, ?)')
                    .join(', ');
                const params = dto.collectionIds.flatMap(collectionId =>
                    [wordId, collectionId]
                );

                await this.db.executeSql(
                    `INSERT INTO word_collections (word_id, collection_id) VALUES ${values}`,
                    params
                );
            }

            return this.getById(wordId);
        } catch (error) {
            console.error('Error creating word:', error);
            throw new Error('Failed to create word');
        }
    }

    async update(id: number, dto: UpdateWordDto): Promise<Word> {
        try {
            const updates: string[] = [];
            const params: any[] = [];

            if (dto.word !== undefined) {
                updates.push('word = ?');
                params.push(dto.word);
            }
            if (dto.img !== undefined) {
                updates.push('img = ?');
                params.push(dto.img);
            }

            if (updates.length > 0) {
                params.push(id);
                await this.db.executeSql(
                    `UPDATE words SET ${updates.join(', ')} WHERE id = ?`,
                    params
                );
            }

            // Update collections if provided
            if (dto.collectionIds !== undefined) {
                // Remove existing collections
                await this.db.executeSql(
                    'DELETE FROM word_collections WHERE word_id = ?',
                    [id]
                );

                // Add new collections
                if (dto.collectionIds.length > 0) {
                    const values = dto.collectionIds
                        .map(() => '(?, ?)')
                        .join(', ');
                    const collectionParams = dto.collectionIds.flatMap(collectionId =>
                        [id, collectionId]
                    );

                    await this.db.executeSql(
                        `INSERT INTO word_collections (word_id, collection_id) VALUES ${values}`,
                        collectionParams
                    );
                }
            }

            return this.getById(id);
        } catch (error) {
            console.error('Error updating word:', error);
            throw new Error('Failed to update word');
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.db.executeSql('DELETE FROM words WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error deleting word:', error);
            throw new Error('Failed to delete word');
        }
    }

    async getAll(collectionId?: number): Promise<Word[]> {
        try {
            let query = `
            SELECT 
                w.id,
                w.word,
                w.img,
                GROUP_CONCAT(c.id) as collection_ids,
                GROUP_CONCAT(c.name) as collection_names
            FROM words w
            LEFT JOIN word_collections wc ON w.id = wc.word_id
            LEFT JOIN collections c ON wc.collection_id = c.id
        `;

            const params: any[] = [];
            if (collectionId !== undefined) {
                query += ` WHERE EXISTS (
                SELECT 1 
                FROM word_collections wc2 
                WHERE wc2.word_id = w.id 
                AND wc2.collection_id = ?
            )`;
                params.push(collectionId);
            }

            query += ' GROUP BY w.id';

            const [wordsResult] = await this.db.executeSql(query, params);

            return Array.from({ length: wordsResult.rows.length })
                .map((_, index) => {
                    const row = wordsResult.rows.item(index);
                    const collections = row.collection_ids
                        ? row.collection_ids.split(',').map((id: string, idx: number) => ({
                            id: parseInt(id, 10),
                            name: row.collection_names.split(',')[idx]
                        }))
                        : [];

                    return {
                        id: row.id,
                        word: row.word,
                        img: row.img,
                        collections
                    };
                });
        } catch (error) {
            console.error('Error getting words:', error);
            throw new Error('Failed to get words');
        }
    }


    private async getById(id: number): Promise<Word> {
        const [result] = await this.db.executeSql(`
            SELECT 
                w.id,
                w.word,
                w.img,
                GROUP_CONCAT(c.id) as collection_ids,
                GROUP_CONCAT(c.name) as collection_names
            FROM words w
            LEFT JOIN word_collections wc ON w.id = wc.word_id
            LEFT JOIN collections c ON wc.collection_id = c.id
            WHERE w.id = ?
            GROUP BY w.id
        `, [id]);

        if (result.rows.length === 0) {
            throw new Error('Word not found');
        }

        const row = result.rows.item(0);
        const collections = row.collection_ids
            ? row.collection_ids.split(',').map((colId: string, idx: number) => ({
                id: parseInt(colId, 10),
                name: row.collection_names.split(',')[idx]
            }))
            : [];

        return {
            id: row.id,
            word: row.word,
            img: row.img,
            collections
        };
    }
}