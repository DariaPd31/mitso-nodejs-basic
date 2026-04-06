import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  try {
    // Проверяем существует ли файл
    await fs.access(filePath);

    // Если существует → ошибка
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Файл не существует → создаём
      await fs.writeFile(filePath, 'I am fresh and young');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await create();