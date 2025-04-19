import {
    enablePromise,
    openDatabase,
    SQLiteDatabase,
} from "react-native-sqlite-storage"

// Enable promise for SQLite
enablePromise(true)

export const connectToDatabase = async () => {
    console.log('Connecting to database...');
    return openDatabase(
        { name: "secondapp.db", location: "default" },
        () => {
            console.log('Database connection successful');
        },
        (error) => {
            console.error('Database connection error:', error);
            throw Error("Could not connect to database");
        }
    );
};


export const createTables = async (db: SQLiteDatabase) => {
    const wordsQuery = `
        CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL,
            img TEXT
        )
    `
    const collectionsQuery = `
        CREATE TABLE IF NOT EXISTS collections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `
    const wordCollectionsQuery = `
        CREATE TABLE IF NOT EXISTS word_collections (
            word_id INTEGER,
            collection_id INTEGER,
            PRIMARY KEY (word_id, collection_id),
            FOREIGN KEY (word_id) REFERENCES words (id) ON DELETE CASCADE,
            FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
    )
    `

    try {
        await db.executeSql(wordsQuery);
        console.log('Words table created');
        await db.executeSql(collectionsQuery);
        console.log('Collections table created');
        await db.executeSql(wordCollectionsQuery);
        console.log('Word_collections table created');
    } catch (error) {
        console.error('Table creation error:', error);
        throw Error(`Failed to create tables`);
    }
}