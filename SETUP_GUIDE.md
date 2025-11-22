# Setup Guide - Full-Stack Development

This project is now organized for full-stack development with separate frontend and backend.

## 📂 Current Structure

```
acc/
├── frontend/          # React Frontend (Already built)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Backend API (Ready for you to build)
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🚀 Running the Frontend

The frontend is already complete and running!

```bash
cd frontend
npm install          # If not already installed
npm run dev          # http://localhost:5173
```

## 🛠️ Setting Up Backend

### Step 1: Choose Your Tech Stack

#### Option A: Node.js + Express (Recommended for JavaScript developers)
```bash
cd backend
npm init -y
npm install express cors dotenv mongoose jsonwebtoken bcrypt
npm install -D nodemon
```

Create `backend/server.js`:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
```

#### Option B: Python + FastAPI
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn python-dotenv sqlalchemy
```

Create `backend/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
```

### Step 2: Create Environment File

Create `backend/.env`:
```env
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Step 3: Set Up Database

Choose your database:
- **PostgreSQL** (Production ready)
- **MongoDB** (Flexible NoSQL)
- **MySQL** (Traditional SQL)
- **SQLite** (Quick development)

### Step 4: Implement API Endpoints

See `backend/README.md` for required endpoints list.

## 🔗 Connecting Frontend to Backend

### Update Frontend API Calls

In `frontend/src/`, update API base URL:

Create `frontend/src/config/api.js`:
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

### Example API Integration

Replace mock authentication in `frontend/src/pages/PortalPage.jsx`:

```javascript
// Old (mock):
window.setTimeout(() => {
  sessionStorage.setItem('acceptopia-authenticated', 'true');
  navigate(from, { replace: true });
}, 700);

// New (real API):
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});

if (response.ok) {
  const { token, user } = await response.json();
  sessionStorage.setItem('acceptopia-authenticated', 'true');
  sessionStorage.setItem('acceptopia-token', token);
  navigate(from, { replace: true });
} else {
  setError('Invalid credentials');
}
```

## 🧪 Testing Full-Stack

### Terminal 1: Frontend
```bash
cd frontend
npm run dev
# http://localhost:5173
```

### Terminal 2: Backend
```bash
cd backend
npm run dev        # or: python main.py
# http://localhost:3000
```

### Terminal 3: Admin Portal
```bash
cd ../../admin-portal
npm run dev
# http://localhost:5174
```

## 📊 Development Workflow

1. **Frontend Development**: Make UI changes in `frontend/src/`
2. **Backend Development**: Build APIs in `backend/`
3. **Integration**: Connect frontend to backend APIs
4. **Testing**: Test both together
5. **Deploy**: Deploy frontend and backend separately

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ to Vercel/Netlify/etc.
```

### Backend
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **AWS/Azure**: Use respective deployment tools
- **Docker**: Use Docker containers

## 📝 Best Practices

✅ Keep frontend and backend code separate  
✅ Use environment variables for config  
✅ Implement proper error handling  
✅ Add input validation  
✅ Use JWT for authentication  
✅ Enable CORS properly  
✅ Add rate limiting  
✅ Log errors and activity  

## 🔐 Security Checklist

- [ ] Hash passwords (bcrypt/argon2)
- [ ] Implement JWT authentication
- [ ] Validate all inputs
- [ ] Sanitize data
- [ ] Use HTTPS in production
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Implement 2FA for admin
- [ ] Regular security audits

## 📚 Resources

- **Node.js**: https://nodejs.org/
- **Express**: https://expressjs.com/
- **FastAPI**: https://fastapi.tiangolo.com/
- **MongoDB**: https://www.mongodb.com/
- **PostgreSQL**: https://www.postgresql.org/

## 🆘 Troubleshooting

**Frontend can't connect to backend?**
- Check CORS configuration
- Verify backend is running
- Check API_BASE_URL in frontend

**Database connection fails?**
- Verify DATABASE_URL in .env
- Check database is running
- Test connection string

**Authentication not working?**
- Check JWT_SECRET is set
- Verify token format
- Check session storage

---

**Ready to build your backend!** 🚀

For more details, see `backend/README.md`

