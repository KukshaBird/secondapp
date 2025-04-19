import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { CollectionWithWords, CreateCollectionDto, UpdateCollectionDto } from '../types/collections.types';

export class CollectionsRepository {
    constructor(private db: SQLiteDatabase) {}

    async create(dto: CreateCollectionDto): Promise<CollectionWithWords> {
        try {
            // Insert collection
            const [result] = await this.db.executeSql(
                'INSERT INTO collections (name) VALUES (?)',
                [dto.name]
            );
            const collectionId = result.insertId;

            // Add words if provided
            if (dto.wordIds?.length) {
                const values = dto.wordIds
                    .map(() => '(?, ?)')
                    .join(', ');
                const params = dto.wordIds.flatMap(wordId =>
                    [wordId, collectionId]
                );

                await this.db.executeSql(
                    `INSERT INTO word_collections (word_id, collection_id) VALUES ${values}`,
                    params
                );
            }

            return this.getById(collectionId);
        } catch (error) {
            console.error('Error creating collection:', error);
            throw new Error('Failed to create collection');
        }
    }

    async update(id: number, dto: UpdateCollectionDto): Promise<CollectionWithWords> {
        try {
            if (dto.name !== undefined) {
                await this.db.executeSql(
                    'UPDATE collections SET name = ? WHERE id = ?',
                    [dto.name, id]
                );
            }

            // Update word associations if provided
            if (dto.wordIds !== undefined) {
                // Remove existing words
                await this.db.executeSql(
                    'DELETE FROM word_collections WHERE collection_id = ?',
                    [id]
                );

                // Add new words
                if (dto.wordIds.length > 0) {
                    const values = dto.wordIds
                        .map(() => '(?, ?)')
                        .join(', ');
                    const wordParams = dto.wordIds.flatMap(wordId =>
                        [wordId, id]
                    );

                    await this.db.executeSql(
                        `INSERT INTO word_collections (word_id, collection_id) VALUES ${values}`,
                        wordParams
                    );
                }
            }

            return this.getById(id);
        } catch (error) {
            console.error('Error updating collection:', error);
            throw new Error('Failed to update collection');
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.db.executeSql('DELETE FROM collections WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error deleting collection:', error);
            throw new Error('Failed to delete collection');
        }
    }

    async getAll(): Promise<CollectionWithWords[]> {
        try {
            const [collectionsResult] = await this.db.executeSql(`
                SELECT 
                    c.id,
                    c.name,
                    GROUP_CONCAT(w.id) as word_ids,
                    GROUP_CONCAT(w.word) as words,
                    GROUP_CONCAT(w.img) as images
                FROM collections c
                LEFT JOIN word_collections wc ON c.id = wc.collection_id
                LEFT JOIN words w ON wc.word_id = w.id
                GROUP BY c.id
            `);

            return Array.from({ length: collectionsResult.rows.length })
                .map((_, index) => {
                    const row = collectionsResult.rows.item(index);
                    const words = row.word_ids
                        ? row.word_ids.split(',').map((id: string, idx: number) => ({
                            id: parseInt(id, 10),
                            word: row.words.split(',')[idx],
                            img: row.images.split(',')[idx]
                        }))
                        : [];

                    return {
                        id: row.id,
                        name: row.name,
                        words
                    };
                });
        } catch (error) {
            console.error('Error getting all collections:', error);
            throw new Error('Failed to get collections');
        }
    }

    private async getById(id: number): Promise<CollectionWithWords> {
        const [result] = await this.db.executeSql(`
            SELECT 
                c.id,
                c.name,
                GROUP_CONCAT(w.id) as word_ids,
                GROUP_CONCAT(w.word) as words,
                GROUP_CONCAT(w.img) as images
            FROM collections c
            LEFT JOIN word_collections wc ON c.id = wc.collection_id
            LEFT JOIN words w ON wc.word_id = w.id
            WHERE c.id = ?
            GROUP BY c.id
        `, [id]);

        if (result.rows.length === 0) {
            throw new Error('Collection not found');
        }

        const row = result.rows.item(0);
        const words = row.word_ids
            ? row.word_ids.split(',').map((wordId: string, idx: number) => ({
                id: parseInt(wordId, 10),
                word: row.words.split(',')[idx],
                img: row.images.split(',')[idx]
            }))
            : [];

        return {
            id: row.id,
            name: row.name,
            words
        };
    }
}