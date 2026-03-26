import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');
    
    try {
        // Проверяем существование исходного файла
        await fs.access(oldPath);
        
        // Проверяем, не существует ли файл с новым именем
        try {
            await fs.access(newPath);
            // Если файл существует, выбрасываем ошибку
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Переименовываем файл
                await fs.rename(oldPath, newPath);
                console.log('✓ File renamed successfully to properFilename.md');
            } else {
                throw new Error('FS operation failed');
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('FS operation failed');
    }
};

await rename();