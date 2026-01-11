Sports Insight Bot
Sports Insight Bot is a full-stack AI-powered sports analysis chatbot that provides tactical insights, match analysis, and image-based sports discussions through an interactive conversational interface.

Project Overview
Sports Insight Bot is a full-stack AI-powered sports analysis chatbot that provides tactical insights, match analysis, and image-based sports discussions through an interactive conversational interface.

Tech Stack:

Backend
Python
FastAPI
OpenRouter (OpenAI-compatible API)
Multimodal Vision Language Model (Qwen 2.5 VL)

Handles:
Text-based chat
Image-to-text sports context extraction
Tactical analysis responses
Deployed on Render

Frontend
HTML
CSS
Vanilla JavaScript
Glassmorphism-style UI with sports-themed design
Image upload + chat interface
Deployed on Vercel


Deployment:

Backend (Render)
Deployed as a FastAPI Web Service
Uses uvicorn as the ASGI server
Environment variables managed securely on Render
Handles all AI processing and API requests

Frontend (Vercel)
Deployed as a static site
Communicates with backend via HTTPS API calls
Provides the complete chatbot user experience

 Note:  
  This monorepo is created for unified code visibility and evaluation purposes.  
  Production deployments currently use separate repositories for frontend and backend.

MONOREPO STRUCTURE:

sports-insight-bot/
│
├── backend/
│   ├── main.py              # FastAPI backend
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile             # Render deployment config
│   └── .env                 # Environment variables (not committed)
│
├── frontend/
│   ├── index.html           # Chat UI
│   ├── style.css            # Styling
│   └── script.js            # Client-side logic
│
├── .gitignore
└── README.md

---

 Features:

- Conversational chatbot interface
- Sports-related question answering
- Clean frontend–backend separation
- Cloud-based deployment
- Monorepo architecture for easier evaluation



 Startup guide:

Backend:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Frontend:

cd frontend
npm install
npm start

Security Notes
API keys are stored using environment variables
.env is excluded via .gitignore
CORS enabled for frontend–backend communication

Author:
Vidit Arora
Software Engineering Student @ DTU
Interests: FullStack Development, AI/ML, Systems Programming

Acknowledgements
This project is built for learning, experimentation, and evaluation purposes, and demonstrates real-world integration of AI, backend APIs, and frontend deployment.