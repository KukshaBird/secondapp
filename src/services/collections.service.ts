import { Collection } from "../types/word.types.ts";
import { CollectionsRepository } from "../repository/collections.repository.ts";

class CollectionsService {
    constructor(
        private readonly collectionsRepository: CollectionsRepository,
    ) {}

    public async create(data: Omit<Collection, 'id'>) {
        return this.collectionsRepository.create(data);
    }

    public async getCollections() {
        return this.collectionsRepository.getAll();
    }

    public async delete(id: number) {
        return this.collectionsRepository.delete(id);
    }
}

export default CollectionsService;