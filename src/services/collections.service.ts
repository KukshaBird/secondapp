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

    public async update(id: number, data: Partial<Collection>) {
        return this.collectionsRepository.update(id, data);
    }
}

export default CollectionsService;