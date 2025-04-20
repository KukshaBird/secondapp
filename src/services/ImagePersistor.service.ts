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
    private initialized: boolean = false;


    constructor() {
        this.basePath = RNFS.DocumentDirectoryPath
        this.imagePath = `${this.basePath}/images`;
    }

    public async ensureInitialized() {
        if (!this.initialized) {
            await this.initializeStorage();
        }
    }


    public async saveImage(uri: string, filename: string): Promise<string> {
        await this.ensureInitialized();

        try {
            // Generate unique filename using timestamp
            const extension = uri.split('.').pop();
            const savedFilename = `${filename}.${extension}`;
            const destPath = `${this.imagePath}/${savedFilename}`;

            const sourceUri = uri.replace('file://', '');
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
                await RNFS.copyFile(sourceUri, destPath);
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

    private async validatePath(path: string): Promise<void> {
        if (await RNFS.exists(path)) {
            throw new Error('Image with this name already exists');
        }
        return;
    }


    private async initializeStorage() {
        try {
            // First check and create the images directory
            const imagesDirExists = await RNFS.exists(this.imagePath);
            if (!imagesDirExists) {
                await RNFS.mkdir(this.imagePath);
                console.log('Created images directory at:', this.imagePath);
            }

            // Double-check that directory was created
            const verifyExists = await RNFS.exists(this.imagePath);
            if (!verifyExists) {
                throw new Error('Failed to create images directory');
            }

            this.initialized = true;
            console.log('Storage initialized successfully');
        } catch (error) {
            console.error('Error initializing storage:', error);
            throw new Error('Could not initialize storage');
        }
    }
}

export default ImagePersistorService;