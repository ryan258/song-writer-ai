const axios = require('axios');

const API_URL = process.env.API_URL;
const MODEL_NAME = process.env.MODEL_NAME;

async function generateSongDrafts(songIdea, numberOfDrafts) {
  if (!API_URL) {
    throw new Error('API_URL is not defined in the environment variables');
  }

  const prompt = `Generate ${numberOfDrafts} song drafts based on this idea: "${songIdea}". For each draft, provide a title (max 80 characters), style (max 120 characters), and lyrics (max 3000 characters, including section headers). Format each draft as follows:
  Title: [title]
  Style: [style]
  Lyrics:
  [lyrics]

  Separate multiple drafts with three dashes (---).`;
  
  try {
    console.log(`Attempting to call Ollama API at: ${API_URL}`);
    const response = await axios.post(API_URL, {
      model: MODEL_NAME,
      prompt: prompt,
      stream: false
    });
    
    const generatedText = response.data.response;
    console.log('Generated text:', generatedText);

    // Parse the generated text into song drafts
    const drafts = generatedText.split('---').map(draft => {
      const lines = draft.trim().split('\n');
      const title = lines.find(line => line.startsWith('Title:'))?.replace('Title:', '').trim() || '';
      const style = lines.find(line => line.startsWith('Style:'))?.replace('Style:', '').trim() || '';
      const lyricsStart = lines.findIndex(line => line.startsWith('Lyrics:'));
      const lyrics = lines.slice(lyricsStart + 1).join('\n').trim();

      return {
        title: title.substring(0, 80),
        style: style.substring(0, 120),
        lyrics: lyrics.substring(0, 3000)
      };
    }).filter(draft => draft.title && draft.style && draft.lyrics);

    return drafts;
  } catch (error) {
    console.error('Error generating song drafts:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    throw new Error('Failed to generate song drafts. Please try again later.');
  }
}

module.exports = {
  generateSongDrafts
};