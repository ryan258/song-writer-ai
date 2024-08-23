// src/routes/songGeneration.js

const express = require('express')
const router = express.Router()
const ollamaService = require('../services/ollamaService')

router.post('/generate', async (req, res) => {
  const { songIdea, numberOfDrafts, useOpenAI } = req.body

  if (!songIdea || !numberOfDrafts) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  if (numberOfDrafts < 1 || numberOfDrafts > 9) {
    return res
      .status(400)
      .json({ error: 'Number of drafts must be between 1 and 9' })
  }

  try {
    const drafts = await ollamaService.generateSongDrafts(
      songIdea,
      numberOfDrafts,
      useOpenAI
    )
    res.json(drafts)
  } catch (error) {
    console.error('Error in song generation route:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
