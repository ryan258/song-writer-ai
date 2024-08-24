// services/ollamaService.js

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const OLLAMA_API_URL = process.env.API_URL || 'http://localhost:11434/api/generate'
const OLLAMA_MODEL_NAME = process.env.MODEL_NAME || 'llama3.1:latest'
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_MODEL_NAME = process.env.OPENAI_MODEL_NAME || 'gpt-3.5-turbo'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

function logSongDrafts(drafts) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const logDir = path.join(__dirname, '..', 'logs')
  const logFile = path.join(logDir, `${timestamp}.log`)

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }

  const logContent = drafts.map((draft, index) => `
Draft ${index + 1}:
Title: ${draft.title}
Style: ${draft.style}
Lyrics:
${draft.lyrics}
`).join('\n---\n')

  fs.writeFileSync(logFile, logContent)
  console.log(`Song drafts logged to ${logFile}`)
}

async function generateSongDrafts(songIdea, numberOfDrafts, useOpenAI = false) {
  const prompt = `Generate ${numberOfDrafts} song drafts based on this idea: "${songIdea}". For each draft, provide a title (max 80 characters), style (max 120 characters), and lyrics (max 3000 characters, including section headers). Format each draft as follows:
  Title: [title]
  Style: [style]
  Lyrics:
  [lyrics]

  Separate multiple drafts with three dashes (---).`

  try {
    let response
    if (useOpenAI) {
      response = await axios.post(
        OPENAI_API_URL,
        {
          model: OPENAI_MODEL_NAME,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
    } else {
      response = await axios.post(OLLAMA_API_URL, {
        model: OLLAMA_MODEL_NAME,
        prompt: prompt,
        stream: false,
      })
    }

    const generatedText = useOpenAI
      ? response.data.choices[0].message.content
      : response.data.response
    const parsedDrafts = parseSongDrafts(generatedText)
    logSongDrafts(parsedDrafts)
    return parsedDrafts
  } catch (error) {
    console.error('Error generating song drafts:', error.message)
    if (error.response) {
      console.error('API response:', error.response.data)
    }
    throw new Error('Failed to generate song drafts. Please try again later.')
  }
}

function parseSongDrafts(generatedText) {
  return generatedText
    .split('---')
    .map((draft) => {
      const lines = draft.trim().split('\n')
      const title =
        lines
          .find((line) => line.startsWith('Title:'))
          ?.replace('Title:', '')
          .trim() || ''
      const style =
        lines
          .find((line) => line.startsWith('Style:'))
          ?.replace('Style:', '')
          .trim() || ''
      const lyricsStart = lines.findIndex((line) => line.startsWith('Lyrics:'))
      const lyrics = lines
        .slice(lyricsStart + 1)
        .join('\n')
        .trim()

      return {
        title: title.substring(0, 80),
        style: style.substring(0, 120),
        lyrics: lyrics.substring(0, 3000),
      }
    })
    .filter((draft) => draft.title && draft.style && draft.lyrics)
}

module.exports = {
  generateSongDrafts,
}