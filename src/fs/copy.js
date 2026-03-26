import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');
    
    try {
        // Проверяем существование исходной папки
        await fs.access(sourceDir);
        
        // Проверяем, не существует ли папка назначения
        try {
            await fs.access(destDir);
            // Если папка назначения существует, выбрасываем ошибку
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Создаем папку назначения
                await fs.mkdir(destDir);
                
                // Читаем все файлы из исходной папки
                const files = await fs.readdir(sourceDir);
                
                // Копируем каждый файл
                for (const file of files) {
                    const sourcePath = path.join(sourceDir, file);
                    const destPath = path.join(destDir, file);
                    const stat = await fs.stat(sourcePath);
                    
                    if (stat.isFile()) {
                        await fs.copyFile(sourcePath, destPath);
                    }
                }
                console.log('✓ Files copied successfully to files_copy');
            } else {
                throw new Error('FS operation failed');
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('FS operation failed');
    }
};

await copy();