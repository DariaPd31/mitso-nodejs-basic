import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filesDir = path.join(__dirname, 'files');
    const filePath = path.join(filesDir, 'fresh.txt');
    const content = 'I am fresh and young';
    
    try {
        // Проверяем/создаем папку files если её нет
        try {
            await fs.access(filesDir);
        } catch {
            await fs.mkdir(filesDir);
        }
        
        // Проверяем существование файла
        try {
            await fs.access(filePath);
            // Если файл существует, выбрасываем ошибку
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Файл не существует, создаем его
                await fs.writeFile(filePath, content, 'utf8');
                console.log('✓ File fresh.txt created successfully');
            } else {
                throw new Error('FS operation failed');
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

await create();