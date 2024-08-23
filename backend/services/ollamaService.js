const axios = require('axios');

const API_URL = process.env.API_URL;
const MODEL_NAME = process.env.MODEL_NAME;

async function generateSongDrafts(songIdea, numberOfDrafts) {
  const prompt = `Generate ${numberOfDrafts} song drafts based on this idea: "${songIdea}". For each draft, provide a title, style, and lyrics.`;
  
  try {
    const response = await axios.post(API_URL, {
      model: MODEL_NAME,
      prompt: prompt,
      stream: false
    });
    
    // TODO: Parse the response and format the song drafts
    return response.data;
  } catch (error) {
    console.error('Error generating song drafts:', error);
    throw error;
  }
}

module.exports = {
  generateSongDrafts
};