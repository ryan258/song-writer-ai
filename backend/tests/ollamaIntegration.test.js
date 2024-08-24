// tests/ollamaIntegration.test.js
const ollamaService = require('../services/ollamaService');

describe('Ollama Integration', () => {
  beforeAll(() => {
    process.env.API_URL = process.env.API_URL || 'http://localhost:11434/api/generate';
    process.env.MODEL_NAME = process.env.MODEL_NAME || 'llama3.1:latest';
    console.log('API_URL:', process.env.API_URL);
    console.log('MODEL_NAME:', process.env.MODEL_NAME);
  });

  test('should generate song drafts from Ollama', async () => {
    const songIdea = 'Write a rap song about version control';
    const numberOfDrafts = 1;

    try {
      const result = await ollamaService.generateSongDrafts(songIdea, numberOfDrafts);

      console.log('Generated drafts:', JSON.stringify(result, null, 2));

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('style');
      expect(result[0]).toHaveProperty('lyrics');
      expect(result[0].title.length).toBeLessThanOrEqual(80);
      expect(result[0].style.length).toBeLessThanOrEqual(120);
      expect(result[0].lyrics.length).toBeLessThanOrEqual(3000);
    } catch (error) {
      console.error('Test failed with error:', error.message);
      throw error;
    }
  }, 30000);
});