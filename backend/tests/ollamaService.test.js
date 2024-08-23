const axios = require('axios');
const ollamaService = require('../services/ollamaService');

jest.mock('axios');

describe('ollamaService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('generateSongDrafts should return formatted song drafts', async () => {
    const mockResponse = {
      data: {
        response: JSON.stringify([
          {
            title: 'Git Commit Blues',
            style: 'Hip-hop fusion',
            lyrics: 'Verse 1:\nPushing code, late night grind\nMerge conflicts, losing my mind\n...'
          }
        ])
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const result = await ollamaService.generateSongDrafts('Write a rap song about version control', 1);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('style');
    expect(result[0]).toHaveProperty('lyrics');
    expect(result[0].title.length).toBeLessThanOrEqual(80);
    expect(result[0].style.length).toBeLessThanOrEqual(120);
    expect(result[0].lyrics.length).toBeLessThanOrEqual(3000);
  });

  test('generateSongDrafts should handle API errors', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    await expect(ollamaService.generateSongDrafts('Test idea', 1))
      .rejects
      .toThrow('Failed to generate song drafts. Please try again later.');
  });
});