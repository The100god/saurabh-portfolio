# Quick Start Guide - MongoDB Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Install MongoDB

**Option A: Local MongoDB**

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run the MSI installer
- MongoDB starts automatically

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
```

**Option B: MongoDB Atlas (No Installation)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (M0 Free Tier)
4. Get connection string

### Step 2: Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### Step 3: Configure MongoDB

**For Local MongoDB:**

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

**For MongoDB Atlas:**

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=development
```

### Step 4: Start Everything

**Terminal 1 - MongoDB (if local):**
```bash
mongod
```

**Terminal 2 - Backend Server:**
```bash
cd server
npm run dev
```

Output should show:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5000
```

**Terminal 3 - React App:**
```bash
npm start
```

### Step 5: Access Your Portfolio

- **Main Site:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/Admin

## Features

✅ Edit all portfolio content
✅ Add/Delete projects, skills, experience
✅ Persistent storage in MongoDB
✅ Auto-sync across pages
✅ Offline mode (uses localStorage)
✅ One-click data reset

## Troubleshooting

### "Cannot connect to MongoDB"

1. Start MongoDB: `mongod`
2. Check connection string in `server/.env`
3. Verify MongoDB is running

### "Port 5000 already in use"

Change PORT in `server/.env`:
```env
PORT=5001
```

### "CORS Error"

Ensure server is running and REACT_APP_API_URL in `.env.local` matches:
```env
REACT_APP_API_URL=http://localhost:5000/api/portfolio
```

### "Admin Panel loads but no API connection"

Check browser console (F12):
- If using localStorage, check status banner (green = MongoDB, orange = localStorage)
- Verify server is running on port 5000

## MongoDB Connection Status

**Status Banner in Admin Panel shows:**

🟢 **Green:** Connected to MongoDB - data saved to database
🟠 **Orange:** Using localStorage - data saved locally (MongoDB not available)

Both work fine! Just make sure you know which mode you're in.

## Database Inspection

### See Your Data

**Using MongoDB Compass:**

1. Download: https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. View `portfolio` database → `portfoliodatas` collection

**Using MongoDB Shell:**

```bash
mongosh

# Connect to database
use portfolio

# View all data
db.portfoliodatas.find()

# View one document
db.portfoliodatas.findOne()

# Count items
db.portfoliodatas.countDocuments()
```

## Common Tasks

### Backup Data

```bash
# Export to JSON
mongodump --db portfolio --out ./backup

# Restore from backup
mongorestore --db portfolio ./backup/portfolio
```

### Export Data

```bash
# In MongoDB shell
use portfolio
db.portfoliodatas.find().toArray() // Copy and paste into JSON file
```

### Reset All Data

Click "Reset to Default" button in Admin Panel ➜ Confirm popup

## API Endpoints Reference

```bash
# Get all data
GET http://localhost:5000/api/portfolio/data

# Check server health
GET http://localhost:5000/api/health

# Add skill
POST http://localhost:5000/api/portfolio/skills
Content-Type: application/json
{"name": "React", "level": 90}

# Add project
POST http://localhost:5000/api/portfolio/portfolio
{"name": "My App", "link": "https://...", "category": "Featured"}

# Reset data
POST http://localhost:5000/api/portfolio/reset
```

## Environment Variables

### Frontend `.env.local`

```env
# API connection
REACT_APP_API_URL=http://localhost:5000/api/portfolio
```

### Backend `server/.env`

```env
# Server port
PORT=5000

# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# Environment
NODE_ENV=development
```

## Production Deployment

### Deploy Backend (Example: Heroku)

```bash
cd server
heroku create portfolio-api
heroku addons:create mongolab:sandbox
git push heroku main
```

### Update Frontend

Create `server/.env.production`:
```env
REACT_APP_API_URL=https://portfolio-api.herokuapp.com/api/portfolio
```

Deploy frontend to Vercel, Netlify, or GitHub Pages.

## Performance Tips

1. **MongoDB Indexes:** Already configured for common queries
2. **Caching:** Frontend caches data locally after fetch
3. **Connection Pooling:** Automatic in Mongoose
4. **Monitor Database:** Use MongoDB Compass for real-time stats

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Use strong MongoDB passwords
- ✅ Keep `.env.example` updated (without secrets)
- ✅ Consider adding authentication for admin panel
- ✅ Use HTTPS in production

## Got Stuck?

1. **Check Logs:**
   - Backend: Check terminal where `npm run dev` runs
   - Frontend: Open browser console (F12)
   - MongoDB: Check mongod terminal

2. **Verify Setup:**
   - MongoDB running? `mongod`
   - Backend running? Port 5000 active?
   - Frontend running? Port 3000 active?

3. **Test Connection:**
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"status":"Server is running","timestamp":"..."}
   ```

4. **Read Full Docs:**
   - Frontend: [AdminPanel README](src/containers/AdminPanel/README.md)
   - Backend: [Server README](server/README.md)
   - Setup: [Detailed Setup Guide](MONGODB_SETUP.md)

## Next Steps

1. ✅ Install MongoDB
2. ✅ Run setup script
3. ✅ Start services (MongoDB → Backend → Frontend)
4. ✅ Go to http://localhost:3000/Admin
5. ✅ Start editing your portfolio!

## Support

- 📖 [Full MongoDB Setup Guide](MONGODB_SETUP.md)
- 📘 [Admin Panel Documentation](src/containers/AdminPanel/README.md)
- 🔧 [Server API Documentation](server/README.md)

---

**Happy coding!** 🎉
