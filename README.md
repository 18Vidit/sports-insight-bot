Sports Insight Bot

A full-stack sports chatbot application that provides sports-related insights through an interactive conversational interface.  
This project is built using a monorepo architecture containing both backend and frontend code in a single repository.


Project Overview
 
Sports Insight Bot allows users to interact with a chatbot to ask sports-related questions.  
The system is designed with a clean separation of concerns:

 Backend: Handles chatbot logic, APIs, and data processing  
 Frontend: Provides a user-friendly web interface to interact with the chatbot  

The project is deployed using modern cloud platforms i.e backend on render and frontend on vercel


Tech Stack:

 Backend:
- Python
- API-based chatbot logic
- Deployed on Render

 Frontend:
- HTML,CSS, JavaScript
- Modern frontend framework (React-based)
- Deployed on Vercel


 Deployment:

 Backend (Render)
- Backend is deployed independently on Render
- Connected to a dedicated backend GitHub repository
- Handles all chatbot processing and responses

 Frontend (Vercel)
- Frontend is deployed on Vercel
- Communicates with the backend via API calls
- Provides the chatbot user interface

 Note:  
  This monorepo is created for unified code visibility and evaluation purposes.  
  Production deployments currently use separate repositories for frontend and backend.

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
backend.py

Frontend:

cd frontend
npm install
npm start
