const env = () => {
    // Получаем все переменные окружения
    const envVars = process.env;
    
    // Фильтруем переменные с префиксом MITSO_
    const mitsoVars = Object.keys(envVars)
        .filter(key => key.startsWith('MITSO_'))
        .map(key => `${key}=${envVars[key]}`)
        .join('; ');
    
    // Выводим результат
    if (mitsoVars) {
        console.log(mitsoVars);
    }
};

env();