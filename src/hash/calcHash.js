import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    
    try {
        // Читаем файл
        const content = await fs.readFile(filePath);
        
        // Вычисляем SHA256 хэш
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        
        // Выводим хэш в консоль
        console.log(hash);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

await calculateHash();