import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            // Преобразуем буфер в строку, переворачиваем и отправляем дальше
            const reversed = chunk.toString().split('').reverse().join('');
            callback(null, reversed);
        }
    });
    
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
    
    reverseTransform.on('error', (error) => {
        console.error('Error:', error.message);
    });
};

await transform();