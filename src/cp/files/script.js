// Дочерний процесс
process.stdin.on('data', (data) => {
    // Отправляем данные обратно в stdout
    process.stdout.write(data);
});

process.on('message', (message) => {
    console.log('Received message from parent:', message);
});

console.log('Child process started with args:', process.argv.slice(2));