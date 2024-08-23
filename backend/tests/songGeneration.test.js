const request = require('supertest');
const express = require('express');
const songGenerationRoute = require('../routes/songGeneration');
const ollamaService = require('../services/ollamaService');

jest.mock('../services/ollamaService');

const app = express();
app.use(express.json());
app.use('/api', songGenerationRoute);

describe('Song Generation Route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('POST /api/generate should return song drafts', async () => {
    const mockDrafts = [
      { title: 'Test Song', style: 'Rock', lyrics: 'Test lyrics' }
    ];
    ollamaService.generateSongDrafts.mockResolvedValue(mockDrafts);

    const response = await request(app)
      .post('/api/generate')
      .send({ songIdea: 'Test idea', numberOfDrafts: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDrafts);
  });

  test('POST /api/generate should handle missing parameters', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /api/generate should handle invalid number of drafts', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({ songIdea: 'Test idea', numberOfDrafts: 10 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /api/generate should handle service errors', async () => {
    ollamaService.generateSongDrafts.mockRejectedValue(new Error('Service error'));

    const response = await request(app)
      .post('/api/generate')
      .send({ songIdea: 'Test idea', numberOfDrafts: 1 });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});