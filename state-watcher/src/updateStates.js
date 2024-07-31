const fs = require('fs');
const path = require('path');

// Путь к вашему main.sc файлу относительно этого скрипта
const inputFilePath = path.join(__dirname, '..', '..', 'src', 'main.sc');
// Путь к вашему файлу типов относительно этого скрипта
const outputFilePath = path.join(__dirname, '..', '..', 'src', 'scripts', 'typeDoc', 'states.js');

// Функция для извлечения состояний из main.sc с учетом иерархии
function extractStates(fileContent) {
  const lines = fileContent.split('\n');
  const states = [];
  const statePaths = [];
  const indentLevels = [];

  lines.forEach(line => {
    const trimmedLine = line.trim();
    const indentLevel = line.search(/\S|$/);

    // Проверяем, является ли строка состоянием
    if (trimmedLine.startsWith('state:')) {
      const stateName = trimmedLine.split(' ')[1];
      // Убираем пути состояний, которые находятся на том же уровне вложенности или глубже
      while (indentLevels.length > 0 && indentLevels[indentLevels.length - 1] >= indentLevel) {
        statePaths.pop();
        indentLevels.pop();
      }
      // Добавляем текущее состояние и уровень вложенности
      statePaths.push(stateName);
      indentLevels.push(indentLevel);

      // Формируем полный путь состояния и добавляем его в список
      const fullPath = statePaths.join('/');
      states.push(`/${fullPath}`);
    }
  });

  return states;
}


// Функция для генерации содержимого файла типов
function generateTypes(states) {
  return `/**
 * @typedef {${states.map(state => `"${state}"`).join(' | ')}} State
 */
`;
}

// Основная функция
function updateStateTypes() {
  // Чтение содержимого main.sc
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${inputFilePath}:`, err);
      return;
    }

    // Вывод содержимого для отладки
    // console.log('File Content:', data);

    // Извлечение состояний с учетом иерархии
    const states = extractStates(data);
    // Вывод извлеченных состояний для отладки
    // console.log('Extracted States:', states);

    // Генерация содержимого файла типов
    const typesContent = generateTypes(states);

    // Запись типов в states.js
    fs.writeFile(outputFilePath, typesContent, (err) => {
      if (err) {
        console.error(`Error writing file ${outputFilePath}:`, err);
      } else {
        console.log(`State types updated in ${outputFilePath}`);
      }
    });
  });
}

// Запуск обновления типов
updateStateTypes();
