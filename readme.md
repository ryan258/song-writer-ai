# Song Writer AI

Song Writer AI is a Vue.js application that leverages AI (specifically Ollama with llama3.1:latest model) to generate song drafts based on user input. This project aims to streamline the creative process for songwriters by providing AI-generated ideas and variations.

## Features

- User input for song ideas
- Variable number of draft generation (1-9, default 3)
- AI-generated song drafts including title, style, and lyrics
- Progress indicator for draft generation
- Error handling and display
- Logging of inputs and AI responses

## Tech Stack

- Frontend: Vue.js with Tailwind CSS
- Backend: Node.js with Express.js
- AI Integration: Ollama (local setup)
- API Communication: Axios
- Cross-Origin Resource Sharing: CORS middleware

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Git
- Ollama (with llama3.1:latest model)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/song-writer-ai.git
   cd song-writer-ai
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following content:
   ```
   PORT=3000
   API_URL=http://localhost:11434/api/generate
   MODEL_NAME=llama3.1:latest
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run serve
   ```

3. Open your browser and navigate to `http://localhost:8080` to use the application.

## Testing

To run the backend tests:
```
cd backend
npm test
```

For integration tests:
```
cd backend
npm run test:integration
```

## Project Roadmap

- [x] Set up basic Vue.js frontend
- [x] Implement Tailwind CSS for styling
- [x] Create backend Express.js server
- [x] Integrate Ollama AI service
- [x] Implement song draft generation API
- [x] Add error handling and display
- [x] Create progress indicator for draft generation
- [x] Implement logging functionality
- [ ] Add user authentication
- [ ] Implement draft saving and retrieval
- [ ] Create mobile-responsive design
- [ ] Add option for different AI models
- [ ] Implement collaborative songwriting features
- [ ] Add export options (PDF, MIDI, etc.)
- [ ] Integrate with music production software
- [ ] Implement multi-language support