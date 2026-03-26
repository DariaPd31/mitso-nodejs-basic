import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const sourcePath = path.join(__dirname, 'files', 'archive.gz');
    const destPath = path.join(__dirname, 'files', 'fileToCompress.txt');
    
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gunzip = zlib.createGunzip();
    
    readStream.pipe(gunzip).pipe(writeStream);
    
    writeStream.on('finish', () => {
        console.log('File decompressed successfully');
    });
    
    readStream.on('error', (error) => {
        console.error('Error reading archive:', error.message);
    });
    
    writeStream.on('error', (error) => {
        console.error('Error writing decompressed file:', error.message);
    });
};

await decompress();