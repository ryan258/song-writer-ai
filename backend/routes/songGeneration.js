// src/routes/songGeneration.js

const express = require('express');
const router = express.Router();
const ollamaService = require('../services/ollamaService');
const fs = require('fs').promises;
const path = require('path');

router.post('/generate', async (req, res) => {
  const { songIdea, numberOfDrafts } = req.body;

  if (!songIdea || !numberOfDrafts) {
    return res.status(400).json({ error: 'Song idea and number of drafts are required.' });
  }

  if (numberOfDrafts < 1 || numberOfDrafts > 9) {
    return res.status(400).json({ error: 'Number of drafts must be between 1 and 9.' });
  }

  try {
    const songDrafts = await ollamaService.generateSongDrafts(songIdea, numberOfDrafts);
    
    // Log the request and response
    const logEntry = `
      Timestamp: ${new Date().toISOString()}
      Request:
        Song Idea: ${songIdea}
        Number of Drafts: ${numberOfDrafts}
      Response:
        ${JSON.stringify(songDrafts, null, 2)}
    `;

    await fs.appendFile(path.join(__dirname, '../logs/song_generation.log'), logEntry);

    res.json(songDrafts);
  } catch (error) {
    console.error('Error in song generation route:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred.' });
  }
});

module.exports = router;