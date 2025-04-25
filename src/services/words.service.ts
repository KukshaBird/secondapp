import { WordsRepository } from "../repository/words.repository.ts";
import { UpdateWordDto, Word } from "../types/word.types.ts";

class WordsService {
    constructor(
        private readonly wordsRepository: WordsRepository,
    ) {}

    public async create(data: Omit<Word, 'id'>) {
        return this.wordsRepository.create(data);
    }

    public async getWords(collectionId?: number) {
        return this.wordsRepository.getAll(collectionId);
    }

    public async update(id: number, data: UpdateWordDto) {
        return this.wordsRepository.update(id, data);
    }

    public async delete(id: number) {
        return this.wordsRepository.delete(id);
    }
}

export default WordsService;