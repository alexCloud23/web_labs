const express = require('express');
const path = require('path');
const logic = require('./js/logic');

const app = express();
const PORT = 3000;

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/resource', express.static(path.join(__dirname, 'resource')));
app.use('/html', express.static(path.join(__dirname, 'html')));

app.get('/api/artists', (req, res) => {
  res.json(logic.getOriginalArtists());
});
app.get('/api/artists/processed', (req, res) => {
  res.json(logic.getProcessedArtists());
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});
app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'result.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 