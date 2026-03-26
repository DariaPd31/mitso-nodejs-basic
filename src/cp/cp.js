import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'script.js');
    
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit', 'ipc']
    });
    
    // Передаем stdin из главного процесса в дочерний
    process.stdin.pipe(child.stdin);
    
    // Передаем stdout из дочернего процесса в главный
    child.stdout.pipe(process.stdout);
    
    child.on('error', (error) => {
        console.error('Error spawning child process:', error);
    });
    
    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Получаем аргументы из командной строки
const args = process.argv.slice(2);
await spawnChildProcess(args);