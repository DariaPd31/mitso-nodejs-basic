import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];
    const results = [];
    
    // Создаем воркеры
    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(path.join(__dirname, 'worker.js'));
        const numberToCalculate = 10 + i;
        
        workers.push({
            worker,
            promise: new Promise((resolve) => {
                worker.on('message', (result) => {
                    resolve(result);
                    worker.terminate();
                });
                
                worker.on('error', () => {
                    resolve({ status: 'error', data: null });
                    worker.terminate();
                });
            })
        });
        
        worker.postMessage(numberToCalculate);
    }
    
    // Ждем все результаты
    for (const worker of workers) {
        const result = await worker.promise;
        results.push(result);
    }
    
    console.log(results);
};

await performCalculations();