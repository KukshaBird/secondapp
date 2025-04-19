import RNFS from 'react-native-fs';


export interface ImagePersistor {
    saveImage(uri: string, filename: string): Promise<string>;
    deleteImage(filepath: string): Promise<void>;
}

/**
 * Image persistor service
 * Class responsible for image storage.
 */
class ImagePersistorService implements ImagePersistor {
    private readonly basePath: string;
    private readonly imagePath: string;

    constructor() {
        this.basePath = RNFS.DocumentDirectoryPath;
        this.imagePath = `${this.basePath}/images`;
        this.initializeStorage().then();
    }

    public async saveImage(uri: string, filename: string): Promise<string> {
        try {
            // Generate unique filename using timestamp
            const extension = uri.split('.').pop();
            const savedFilename = `${filename}.${extension}`;
            const destPath = `${this.imagePath}/${savedFilename}`;

            await this.validatePath(destPath);

            // If URI is a remote URL, download it
            if (uri.startsWith('http')) {
                await RNFS.downloadFile({
                    fromUrl: uri,
                    toFile: destPath,
                }).promise;
            }
            // If URI is a local file, copy it
            else {
                await RNFS.copyFile(uri, destPath);
            }

            return destPath;
        } catch (error) {
            console.error('Failed to save image:', error);
            throw new Error('Image save failed');
        }
    }

    public async deleteImage(filepath: string): Promise<void> {
        try {
            if (await RNFS.exists(filepath)) {
                await RNFS.unlink(filepath);
            }
        } catch (error) {
            console.error('Failed to delete image:', error);
            throw new Error('Image deletion failed');
        }
    }


    private async validatePath(path: string): Promise<boolean> {
        if (await RNFS.exists(path)) {
            throw new Error('Image with this name already exists');
        }

        return true;
    }


    private async initializeStorage() {
        try {
            const exists = await RNFS.exists(this.basePath);
            if (!exists) {
                await RNFS.mkdir(this.basePath);
            }
        } catch (error) {
            console.error('Error initializing storage:', error);
            throw new Error('Could not initialize storage');
        }
    }

}