const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Путь к файлу main.sc относительно этого скрипта
const mainFilePath = path.join(__dirname, '..', '..', 'src', 'main.sc');

// Функция для запуска скрипта обновления типов
function runUpdateScript() {
  exec('node src/updateStates.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
}

// Наблюдение за изменениями в main.sc
const watcher = chokidar.watch(mainFilePath, { persistent: true });

watcher
  .on('change', () => {
    console.log(`${mainFilePath} has been changed`);
    runUpdateScript();
  })
  .on('error', error => console.error(`Watcher error: ${error}`));

// Первоначальный запуск скрипта обновления
runUpdateScript();
