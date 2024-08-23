require('dotenv').config();
const express = require('express');
const cors = require('cors');
const songGenerationRoute = require('./routes/songGeneration');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', songGenerationRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});