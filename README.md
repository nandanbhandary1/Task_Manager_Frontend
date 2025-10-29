# Task Tracker Smart

A clean and simple **Task Management Application** built with **Flask (Python)** on the backend and **Vanilla JavaScript, HTML, and CSS** on the frontend.

This project helps users efficiently add, track, and manage their daily tasks — while also providing small analytical insights about task priorities and upcoming deadlines.

---

## Features

- Add, view, delete, and update tasks  
- Mark tasks as **Completed** or **Undo** them  
- Choose task priority dynamically (**Low / Medium / High**)  
- Track tasks with **due dates**  
- View summary insights (pending, completed, due soon, etc.)

---

## Tech Stack

- **Backend:** Flask, SQLAlchemy, SQLite3  
- **Frontend:** HTML, CSS, JavaScript (Fetch API)  
- **Hosting:** Backend – Railway • Frontend – Netlify  

---

## How to Run Locally

### Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

Setup Backend (Flask)
cd backend
python -m venv venv
venv\Scripts\activate        # For Windows
# or
source venv/bin/activate     # For Linux/Mac

pip install -r requirements.txt
python app.py

Setup Frontend
// Old (for local testing)
const API = "http://127.0.0.1:5000";

// New (for deployment)
const API = "https://web-production-22622.up.railway.app";

Deployed Links

Frontend: https://tasktracker24.netlify.app/
Backend: https://task-manager-backend-production-9b61.up.railway.app/
