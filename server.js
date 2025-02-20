import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Adjust size as needed


// Store data in memory and file
let primarySubtitles = [];
let secondarySubtitles = [];
let translatedSubtitles = []; // Store translated subtitles

const DATA_FILE = 'subtitles_data.json';

// Load data from file on startup
async function loadData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const parsedData = JSON.parse(data);
    primarySubtitles = parsedData.primarySubtitles || [];
    secondarySubtitles = parsedData.secondarySubtitles || [];
    translatedSubtitles = parsedData.translatedSubtitles || [];
  } catch (error) {
    console.log('No existing data file, starting with empty data');
  }
}

// Save data to file
async function saveData() {
  const data = {
    primarySubtitles,
    secondarySubtitles,
    translatedSubtitles // Save translated subtitles
  };
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET primary subtitles
app.get('/api/subtitles/primary', (req, res) => {
  res.json(primarySubtitles);
});

// GET secondary subtitles
app.get('/api/subtitles/secondary', (req, res) => {
  res.json(secondarySubtitles);
});

// GET translated subtitles
app.get('/api/subtitles/translated', (req, res) => {
  res.json(translatedSubtitles);
});

// POST primary subtitles
app.post('/api/subtitles/primary', async (req, res) => {
  primarySubtitles = req.body;
  await saveData();
  res.json({ message: 'Primary subtitles saved successfully' });
});

// POST secondary subtitles
app.post('/api/subtitles/secondary', async (req, res) => {
  secondarySubtitles = req.body;
  await saveData();
  res.json({ message: 'Secondary subtitles saved successfully' });
});

// POST translated subtitles
app.post('/api/subtitles/translated', async (req, res) => {
  translatedSubtitles = req.body;
  await saveData();
  res.json({ message: 'Translated subtitles saved successfully' });
});

// PUT update primary subtitle
app.put('/api/subtitles/primary/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSubtitle = req.body;
  
  const index = primarySubtitles.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    primarySubtitles[index] = { ...primarySubtitles[index], ...updatedSubtitle };
    await saveData();
    res.json(primarySubtitles[index]);
  } else {
    res.status(404).json({ message: 'Subtitle not found' });
  }
});

// PUT update secondary subtitle
app.put('/api/subtitles/secondary/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSubtitle = req.body;
  
  const index = secondarySubtitles.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    secondarySubtitles[index] = { ...secondarySubtitles[index], ...updatedSubtitle };
    await saveData();
    res.json(secondarySubtitles[index]);
  } else {
    res.status(404).json({ message: 'Subtitle not found' });
  }
});

// Initialize data and start server
loadData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});