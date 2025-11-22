# 🚀 Backend Setup Instructions

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Create .env File

Create a `.env` file in the backend directory with these variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/acceptopia

# JWT Secret Key (change this!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Frontend URL
CLIENT_URL=http://localhost:5173

# OTP Configuration
OTP_EXPIRE_MINUTES=10
```

## Step 3: Setup MongoDB

### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Start MongoDB
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/acceptopia?retryWrites=true&w=majority
```

## Step 4: Setup Gmail for Emails

1. Go to Google Account: https://myaccount.google.com
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
4. Update `.env`:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  (the 16-char password)
```

## Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will be available at: **http://localhost:5000**

## ✅ Test the API

### Health Check
```bash
curl http://localhost:5000
```

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "student"
  }'
```

## 📚 API Documentation

See `API_DOCUMENTATION.md` for complete API reference with all endpoints and examples.

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check `MONGO_URI` in `.env`

### Email Not Sending
- Use Gmail App Password (not regular password)
- Enable 2FA on Gmail
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 5001)

## 🎉 You're Ready!

Your backend is now set up and ready to handle:
- ✅ User Registration
- ✅ User Login with JWT
- ✅ Password Reset with OTP
- ✅ Protected Routes
- ✅ Role-based Authorization

