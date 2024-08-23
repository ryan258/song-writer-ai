// src/services/ollamaService.js

const axios = require('axios');

const API_URL = process.env.API_URL;
const MODEL_NAME = process.env.MODEL_NAME;

async function generateSongDrafts(songIdea, numberOfDrafts) {
  const prompt = `Generate ${numberOfDrafts} song drafts based on this idea: "${songIdea}". For each draft, provide a title (max 80 characters), style (max 120 characters), and lyrics (max 3000 characters, including section headers). Format the response as a JSON array of objects, each with 'title', 'style', and 'lyrics' properties.`;
  
  try {
    const response = await axios.post(API_URL, {
      model: MODEL_NAME,
      prompt: prompt,
      stream: false
    });
    
    const generatedText = response.data.response;
    const songDrafts = JSON.parse(generatedText);

    // Validate and trim the generated drafts
    return songDrafts.map(draft => ({
      title: draft.title.substring(0, 80),
      style: draft.style.substring(0, 120),
      lyrics: draft.lyrics.substring(0, 3000)
    }));
  } catch (error) {
    console.error('Error generating song drafts:', error);
    throw new Error('Failed to generate song drafts. Please try again later.');
  }
}

module.exports = {
  generateSongDrafts
};