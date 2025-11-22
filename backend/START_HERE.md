# 🎉 Welcome to Acceptopia Backend!

Your complete authentication system is ready! Follow these simple steps to get started.

---

## ⚡ Quick Start (3 Minutes)

### 1️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 2️⃣ Create `.env` File
Open `ENV_TEMPLATE.txt`, copy its content, and create a `.env` file with your actual credentials.

**Minimum Required:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/acceptopia
JWT_SECRET=your_secret_key_here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 3️⃣ Start MongoDB
```bash
mongod
```
Or use MongoDB Atlas (cloud) - see `SETUP.md`

### 4️⃣ Run the Server
```bash
npm run dev
```

**✅ Server running at:** `http://localhost:5000`

---

## 🎯 What's Included?

### ✨ Complete Authentication System
- ✅ **User Signup** - Register with name, email, password, role
- ✅ **User Login** - JWT-based authentication
- ✅ **Forgot Password** - 6-digit OTP via email
- ✅ **Reset Password** - Secure password reset
- ✅ **Protected Routes** - JWT middleware for auth
- ✅ **Role-Based Access** - Student/Teacher/Admin roles
- ✅ **Profile Management** - Get and update user profile

### 🛠️ Technologies Used
- **Node.js + Express** - Backend framework
- **MongoDB + Mongoose** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **Nodemailer** - Email service
- **ES6 Modules** - Modern JavaScript

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/forgot-password` | Request OTP | ❌ |
| POST | `/api/auth/reset-password` | Reset password with OTP | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/update-profile` | Update profile | ✅ |

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `START_HERE.md` | This file - quick overview |
| `QUICK_START.txt` | Fast setup guide |
| `SETUP.md` | Detailed setup instructions |
| `API_DOCUMENTATION.md` | Complete API reference with examples |
| `ENV_TEMPLATE.txt` | Template for .env file |
| `test-api.http` | API test requests for REST Client |

---

## 🧪 Test Your API

### Option 1: Using cURL (Command Line)
```bash
# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"student"}'
```

### Option 2: Using Postman/Thunder Client
1. Open `test-api.http`
2. Copy requests to Postman
3. Test all endpoints

### Option 3: Using REST Client (VS Code Extension)
1. Install "REST Client" extension
2. Open `test-api.http`
3. Click "Send Request" above each test

---

## 📁 Project Structure

```
backend/
├── 📂 config/
│   ├── db.js              # MongoDB connection
│   └── email.js           # Email service with beautiful templates
│
├── 📂 controllers/
│   └── authController.js  # All authentication logic
│                          # • signup, login
│                          # • forgotPassword, resetPassword
│                          # • getMe, updateProfile
│
├── 📂 middleware/
│   └── authMiddleware.js  # JWT verification & role authorization
│
├── 📂 models/
│   └── User.js            # User schema with methods
│                          # • comparePassword()
│                          # • generateOTP()
│                          # • verifyOTP()
│
├── 📂 routes/
│   └── authRoutes.js      # API route definitions
│
├── 📄 server.js           # Express app configuration
├── 📄 package.json        # Dependencies
├── 📄 .env               # Environment variables (YOU NEED TO CREATE THIS)
└── 📚 Documentation files
```

---

## 🔐 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **JWT Tokens** - Secure, expire after 7 days
- ✅ **OTP Expiration** - 10 minutes validity
- ✅ **Email Validation** - Regex pattern matching
- ✅ **Duplicate Prevention** - Email uniqueness check
- ✅ **Password Exclusion** - Not returned in queries
- ✅ **CORS Protection** - Configured for frontend
- ✅ **Input Validation** - All endpoints validated

---

## 🎨 Email Features

Beautiful, professional email templates included:

### 📧 OTP Email (Password Reset)
- Modern gradient design
- Clear OTP display
- Security warnings
- Expiration timer

### 📧 Welcome Email (Optional)
- Sent on successful signup
- Brand-consistent design
- Call-to-action button

---

## 🚀 Usage Example

### 1. Register a User
```javascript
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5...",
    "user": {
      "id": "64abc123...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    }
  }
}
```

### 2. Login
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:** Same as signup (includes token)

### 3. Access Protected Route
```javascript
GET /api/auth/me
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

## 🔧 Common Issues & Solutions

### ❌ MongoDB Connection Error
**Problem:** Can't connect to database
**Solution:**
- Start MongoDB: `mongod`
- Or use MongoDB Atlas cloud database
- Check `MONGO_URI` in `.env`

### ❌ Email Not Sending
**Problem:** OTP email fails to send
**Solution:**
- Use Gmail App Password (not regular password)
- Enable 2-Factor Authentication on Gmail
- Visit: https://myaccount.google.com/apppasswords

### ❌ Port Already in Use
**Problem:** Port 5000 is busy
**Solution:**
- Change `PORT` in `.env` to 5001 or 5002
- Or stop the process using port 5000

### ❌ Token Expired/Invalid
**Problem:** "Invalid or expired token" error
**Solution:**
- Login again to get fresh token
- Token expires after 7 days by default
- Check `JWT_SECRET` is set in `.env`

---

## 📦 Dependencies Installed

```json
{
  "express": "^4.18.2",           // Web framework
  "mongoose": "^8.0.3",           // MongoDB ODM
  "bcryptjs": "^2.4.3",           // Password hashing
  "jsonwebtoken": "^9.0.2",       // JWT tokens
  "nodemailer": "^6.9.7",         // Email service
  "dotenv": "^16.3.1",            // Environment variables
  "cors": "^2.8.5",               // Cross-origin requests
  "express-validator": "^7.0.1"   // Input validation
}
```

---

## 🎯 Next Steps

### For Development:
1. ✅ Test all endpoints using `test-api.http`
2. ✅ Customize email templates in `config/email.js`
3. ✅ Add more user fields in `models/User.js`
4. ✅ Create additional controllers and routes
5. ✅ Add more middleware (rate limiting, etc.)

### For Production:
1. ✅ Use MongoDB Atlas for database
2. ✅ Generate strong `JWT_SECRET`
3. ✅ Set `NODE_ENV=production`
4. ✅ Use production email service
5. ✅ Deploy to Heroku, Vercel, or AWS

---

## 📞 Need Help?

1. Check `API_DOCUMENTATION.md` for detailed API reference
2. Read `SETUP.md` for detailed setup instructions
3. Review `QUICK_START.txt` for quick command reference
4. Use `test-api.http` to test endpoints

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with credentials
- [ ] MongoDB running (local or Atlas)
- [ ] Gmail App Password generated
- [ ] Server started (`npm run dev`)
- [ ] API tested and working
- [ ] Ready to integrate with frontend!

---

## 🎉 You're All Set!

Your backend authentication system is **production-ready** with:
- ✨ Clean, modular code structure
- 🔐 Secure password handling
- 📧 Professional email templates
- 🛡️ JWT-based authentication
- 📚 Complete documentation
- 🧪 Test examples included

**Happy coding! 🚀**

---

*Built with ❤️ for Acceptopia*

