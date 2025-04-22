import { WordsRepository } from "../repository/words.repository.ts";
import { Word } from "../types/word.types.ts";

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
}

export default WordsService;