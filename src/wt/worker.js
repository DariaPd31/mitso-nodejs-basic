import { parentPort } from 'worker_threads';

// Функция для вычисления n-го числа Фибоначчи
const nthFibonacci = (n) => {
    if (n < 2) return n;
    return nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

parentPort.on('message', (data) => {
    try {
        const result = nthFibonacci(data);
        parentPort.postMessage({ status: 'resolved', data: result });
    } catch (error) {
        parentPort.postMessage({ status: 'error', data: null });
    }
});