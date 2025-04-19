import { Collection } from "./word.types.ts";

export interface CreateCollectionDto {
    name: string;
    wordIds?: number[];
}

export interface UpdateCollectionDto {
    name?: string;
    wordIds?: number[];
}

export interface CollectionWithWords extends Collection {
    words?: {
        id: number;
        word: string;
        img: string;
    }[];
}
