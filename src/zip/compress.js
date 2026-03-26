import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.join(__dirname, 'files', 'archive.gz');
    
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gzip = zlib.createGzip();
    
    readStream.pipe(gzip).pipe(writeStream);
    
    writeStream.on('finish', () => {
        console.log('File compressed successfully');
    });
    
    readStream.on('error', (error) => {
        console.error('Error reading source file:', error.message);
    });
    
    writeStream.on('error', (error) => {
        console.error('Error writing compressed file:', error.message);
    });
};

await compress();