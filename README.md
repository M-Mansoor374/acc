# Acceptopia - Main Application

Full-stack application with separate frontend and backend.

## 📁 Project Structure

```
acc/
├── frontend/          # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── store/
│   │   └── data/
│   ├── package.json
│   └── vite.config.js
│
└── backend/          # Backend API (To be implemented)
    └── (Your backend code here)
```

## 🚀 Frontend Development

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Development Server
```bash
cd frontend
npm run dev
```
Server runs on: `http://localhost:5173`

### Build for Production
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

## 🔧 Backend Development

Backend folder is ready for your API implementation.

Recommended tech stacks:
- **Node.js + Express** (JavaScript/TypeScript)
- **Python + Flask/FastAPI** (Python)
- **Java + Spring Boot** (Java)
- **Go + Gin/Echo** (Go)

## 🌐 Deployment

**Frontend:** Deploy `frontend/dist/` to static hosting  
**Backend:** Deploy backend to your preferred platform

Recommended domains:
- Frontend: `app.acceptopia.com`
- Backend API: `api.acceptopia.com`

## 📖 Full Documentation

See main `README.md` in the project root for complete details.

## 🔐 Environment Variables

Create `.env` files in respective folders:
- `frontend/.env` for frontend config
- `backend/.env` for backend config

---

**Ready to start backend development!** 🚀

