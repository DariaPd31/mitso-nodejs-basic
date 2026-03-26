const args = () => {
    // Получаем аргументы командной строки (пропускаем первые два: node и путь к файлу)
    const argsList = process.argv.slice(2);
    
    // Парсим аргументы в формате --propName value
    const result = [];
    for (let i = 0; i < argsList.length; i += 2) {
        const propName = argsList[i].replace(/^--/, '');
        const value = argsList[i + 1];
        if (propName && value) {
            result.push(`${propName} is ${value}`);
        }
    }
    
    // Выводим результат
    if (result.length > 0) {
        console.log(result.join(', '));
    }
};

args();