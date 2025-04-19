export interface Word {
    id: number;
    word: string;
    img: string;
    collections?: Collection[];
}

export interface Collection {
    id: number;
    name: string;
}

export interface CreateWordDto {
    word: string;
    img: string;
    collectionIds?: number[];
}

export interface UpdateWordDto {
    word?: string;
    img?: string;
    collectionIds?: number[];
}