import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const dirPath = path.join(__dirname, 'files');
    
    try {
        // Проверяем существование папки
        await fs.access(dirPath);
        
        // Читаем содержимое папки
        const files = await fs.readdir(dirPath);
        
        // Выводим массив имен файлов в консоль
        console.log(files);
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('FS operation failed');
    }
};

await list();