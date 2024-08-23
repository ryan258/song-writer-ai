// tests/ollamaService.test.js

const axios = require('axios')
const ollamaService = require('../src/services/ollamaService')

jest.mock('axios')

describe('ollamaService', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('generateSongDrafts should return formatted song drafts using Ollama', async () => {
    const mockResponse = {
      data: {
        response: `Title: Test Song
Style: Rock
Lyrics:
Verse 1
This is a test song
Chorus
Testing, testing, 1, 2, 3
---
Title: Another Test
Style: Pop
Lyrics:
Verse 1
Another test song
Chorus
More testing, more fun`,
      },
    }
    axios.post.mockResolvedValue(mockResponse)

    const result = await ollamaService.generateSongDrafts('Test idea', 2, false)

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('title', 'Test Song')
    expect(result[0]).toHaveProperty('style', 'Rock')
    expect(result[0]).toHaveProperty('lyrics')
    expect(result[1]).toHaveProperty('title', 'Another Test')
    expect(result[1]).toHaveProperty('style', 'Pop')
    expect(result[1]).toHaveProperty('lyrics')
  })

  test('generateSongDrafts should return formatted song drafts using OpenAI', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: `Title: OpenAI Song
Style: AI-generated
Lyrics:
Verse 1
This is an AI song
Chorus
Singing with algorithms
---
Title: GPT Melody
Style: Tech-pop
Lyrics:
Verse 1
Bits and bytes make music
Chorus
Digital harmony`,
            },
          },
        ],
      },
    }
    axios.post.mockResolvedValue(mockResponse)

    const result = await ollamaService.generateSongDrafts('AI music', 2, true)

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('title', 'OpenAI Song')
    expect(result[0]).toHaveProperty('style', 'AI-generated')
    expect(result[0]).toHaveProperty('lyrics')
    expect(result[1]).toHaveProperty('title', 'GPT Melody')
    expect(result[1]).toHaveProperty('style', 'Tech-pop')
    expect(result[1]).toHaveProperty('lyrics')
  })

  test('generateSongDrafts should handle API errors', async () => {
    axios.post.mockRejectedValue(new Error('API Error'))

    await expect(
      ollamaService.generateSongDrafts('Test idea', 1, false)
    ).rejects.toThrow('Failed to generate song drafts. Please try again later.')
  })
})
