const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const resourceDir = path.join(__dirname, 'public', 'resource');
if (!fs.existsSync(resourceDir)) {
  fs.mkdirSync(resourceDir, { recursive: true });
}

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Статические файлы из папки 'public'
app.use(express.static('public'));

// Обработка POST-запроса для обработки массива инструментов
app.post('/process', (req, res) => {
  const instruments = req.body.instruments;
  if (!Array.isArray(instruments)) {
    return res.status(400).json({ error: 'Ожидается массив инструментов' });
  }

  // Исправление первой буквы и сортировка
  const correctedInstruments = instruments.map(instrument => {
    return instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase();
  }).sort();

  // Сохранение исходного массива
  fs.writeFileSync(path.join(__dirname, 'public', 'resource', 'original.txt'), instruments.join('\n'), 'utf8');

  // Сохранение исправленного массива
  fs.writeFileSync(path.join(__dirname, 'public', 'resource', 'corrected.txt'), correctedInstruments.join('\n'), 'utf8');

  res.json({ original: instruments, corrected: correctedInstruments });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
