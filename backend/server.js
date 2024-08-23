// src/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const songGenerationRoute = require('./routes/songGeneration');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ensure log directory exists
const logDir = path.join(__dirname, 'logs');
fs.mkdir(logDir, { recursive: true }).catch(console.error);

app.use('/api', songGenerationRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});