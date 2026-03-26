import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
    
    try {
        // Проверяем существование файла
        await fs.access(filePath);
        
        // Удаляем файл
        await fs.unlink(filePath);
        console.log('✓ File fileToRemove.txt deleted successfully');
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('FS operation failed');
    }
};

await remove();