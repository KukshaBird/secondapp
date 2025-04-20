import { useEffect, useState } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { connectToDatabase, createTables } from "../../database/sqlite.ts";

export const useConnectDatabase = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [db, setDb] = useState<SQLiteDatabase>();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Initialize database
                const db = await connectToDatabase();
                await createTables(db);
                setDb(db);

            } catch (error) {
                console.error('Error during initialization:', error);
            } finally {
                setIsConnecting(false);
            }
        };

        initializeApp().then();

        return () => {
            db?.close()
        }
    }, []);

    return {
        isConnecting,
        db
    }
}