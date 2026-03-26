import path from 'path';
import { fileURLToPath } from 'url';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { readFileSync } from 'fs';
import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = JSON.parse(readFileSync(new URL('./files/a.json', import.meta.url), 'utf8'));
} else {
    unknownObject = JSON.parse(readFileSync(new URL('./files/b.json', import.meta.url), 'utf8'));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((req, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C');
});

export default myServer;