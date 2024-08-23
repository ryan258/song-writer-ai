// src/api.js
import axios from 'axios'

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api'

export default {
  async generateSongDrafts(songIdea, numberOfDrafts, useOpenAI) {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate`, {
        songIdea,
        numberOfDrafts,
        useOpenAI,
      })
      return response.data
    } catch (error) {
      console.error('Error generating song drafts:', error)
      throw error
    }
  },
}
