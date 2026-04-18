# 📚 Documentation Index

## Quick Navigation

### 🚀 Getting Started
- **[QUICK_START.md](QUICK_START.md)** - Start here! 5-minute setup
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Complete MongoDB setup guide
- **[setup.bat](setup.bat)** - Windows automated setup (preferred)
- **[setup.sh](setup.sh)** - Mac/Linux automated setup

### 📖 Component Documentation
- **[Admin Panel Guide](src/containers/AdminPanel/README.md)** - Admin panel features & usage
- **[Server API Docs](server/README.md)** - Backend API endpoints & deployment

### 📁 Project Structure

```
portfolio/
├── 📄 QUICK_START.md              ← Start here!
├── 📄 MONGODB_SETUP.md            ← Detailed setup
├── 📄 DOCS_INDEX.md               ← This file
├── 🔧 setup.bat                   ← Windows setup
├── 🔧 setup.sh                    ← Linux/Mac setup
│
├── 🎨 Frontend (React)
│   ├── src/
│   │   ├── App.js                 ← Main app with DataProvider
│   │   ├── context/
│   │   │   └── DataContext.js     ← Global state + MongoDB API
│   │   ├── hooks/
│   │   │   └── useData.js         ← Custom hook
│   │   ├── containers/
│   │   │   ├── AdminPanel/        ← Admin interface
│   │   │   ├── About/             ← Uses DataContext
│   │   │   └── Portfolio/         ← Uses DataContext
│   │   └── components/
│   │       └── navBar/            ← Links to /Admin
│   ├── package.json
│   └── .env.local                 ← API URL
│
├── 🔌 Backend (Node + Express + MongoDB)
│   ├── server/
│   │   ├── index.js               ← Server setup
│   │   ├── package.json
│   │   ├── .env                   ← MongoDB URI (create from .env.example)
│   │   ├── .env.example           ← Template
│   │   ├── models/
│   │   │   └── PortfolioData.js   ← MongoDB schema
│   │   └── routes/
│   │       └── portfolio.js       ← API endpoints
│   └── README.md                  ← Server documentation
│
└── 📄 This README
```

## Setup Methods

### Method 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Method 2: Manual Setup

1. **Frontend:**
   ```bash
   npm install
   echo "REACT_APP_API_URL=http://localhost:5000/api/portfolio" > .env.local
   ```

2. **Backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure MongoDB URI in .env
   ```

### Method 3: Step-by-Step

See [QUICK_START.md](QUICK_START.md) for detailed steps.

## Complete Workflow

```
┌─────────────────────────────────────┐
│  Start MongoDB                      │
│  mongod (local) or Atlas (cloud)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Start Backend Server               │
│  cd server && npm run dev           │
│  Runs on: http://localhost:5000     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Start Frontend (React)             │
│  npm start                          │
│  Runs on: http://localhost:3000     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Access Portfolio                   │
│  Main: http://localhost:3000        │
│  Admin: http://localhost:3000/Admin │
└─────────────────────────────────────┘
```

## Feature Overview

### Admin Panel Features
- ✅ Edit personal information
- ✅ Manage skills & experience
- ✅ Add/delete projects
- ✅ Manage education & certificates
- ✅ Real-time updates
- ✅ Toast notifications
- ✅ One-click reset

### Data Management
- ✅ MongoDB persistent storage
- ✅ Automatic localStorage fallback
- ✅ API-based updates
- ✅ Real-time synchronization
- ✅ Automatic backups (MongoDB)

### Deployment Ready
- ✅ Environment-based configuration
- ✅ Production-ready server
- ✅ CORS enabled
- ✅ Error handling
- ✅ Health check endpoint

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| MongoDB won't connect | Check `.env` URI, ensure mongod is running |
| Port 5000 in use | Change PORT in server/.env |
| CORS error | Check REACT_APP_API_URL in .env.local |
| Admin panel empty | Check browser console, verify API URL |
| Slow performance | Check MongoDB indices, reduce load |
| Data not saving | Verify MongoDB connection, check logs |

See [QUICK_START.md](QUICK_START.md#troubleshooting) for detailed troubleshooting.

## Technology Stack

- **Frontend:** React 18, React Router, SCSS
- **Backend:** Express.js, Node.js
- **Database:** MongoDB with Mongoose
- **Styling:** SCSS with CSS variables
- **Notifications:** React Toastify
- **HTTP Client:** Fetch API

## API Reference

### Data Endpoints

All endpoints prefix: `http://localhost:5000/api/portfolio`

```bash
# Get all data
GET /data

# Personal info
PUT /personal-info

# Skills
POST /skills          # Add
DELETE /skills/:id    # Delete
PUT /skills           # Update all

# Portfolio
POST /portfolio       # Add
DELETE /portfolio/:id # Delete
PUT /portfolio        # Update all

# Experience, Education, Certificates
# ...similar pattern for each

# Admin
POST /reset          # Reset to default
GET /health          # Server status
```

See [server/README.md](server/README.md#api-endpoints) for detailed API docs.

## Database Schema

```javascript
{
  personalInfo: {
    name, role, age, address, email,
    phone, linkedin, github, summary
  },
  skills: [{ name, level }],
  portfolio: [{ name, link, category }],
  experience: [{ company, position, duration, description }],
  education: [{ institution, degree, year, description }],
  certificates: [{ name, issuer, date, link }]
}
```

## File Management

### Don't Edit
- `build/` - Build output
- `node_modules/` - Dependencies
- `.git/` - Version control

### Do Edit
- `src/` - React components
- `server/` - Backend code
- `.env.local` - Frontend config
- `server/.env` - Backend config

## Environment Files

### Frontend `.env.local`
```env
REACT_APP_API_URL=http://localhost:5000/api/portfolio
```

### Backend `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

## Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Backend environment configured
- [ ] Server deployed (Heroku, Railway, AWS, etc.)
- [ ] Frontend `.env` updated with production API URL
- [ ] Frontend deployed (Vercel, Netlify, etc.)
- [ ] Tested in production
- [ ] HTTPS enabled
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Performance Optimization

1. **MongoDB:** Indexes on common queries
2. **Frontend:** React lazy loading, memoization
3. **Backend:** Connection pooling, response caching
4. **Network:** Compression, CDN for static assets

## Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Validate input on server
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Monitor access logs
- ✅ Use strong MongoDB passwords
- ✅ Consider adding authentication

## Common Commands

```bash
# Frontend
npm install          # Install dependencies
npm start            # Start dev server
npm build            # Build for production
npm test             # Run tests

# Backend
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm start            # Start production

# MongoDB
mongod               # Start local MongoDB
mongosh              # MongoDB shell
mongodump            # Backup
mongorestore         # Restore

# Utilities
curl localhost:5000  # Test backend
git status           # Check git status
```

## Getting Help

1. **Check Logs:**
   - Backend console
   - Browser console (F12)
   - MongoDB logs

2. **Review Docs:**
   - [QUICK_START.md](QUICK_START.md)
   - [MONGODB_SETUP.md](MONGODB_SETUP.md)
   - [Admin Panel README](src/containers/AdminPanel/README.md)
   - [Server README](server/README.md)

3. **Verify Setup:**
   - MongoDB running?
   - Backend running on 5000?
   - Frontend running on 3000?
   - API responding? (`curl localhost:5000/api/health`)

## Next Steps

1. ✅ Read [QUICK_START.md](QUICK_START.md)
2. ✅ Run setup script
3. ✅ Start services
4. ✅ Access admin panel
5. ✅ Update portfolio content
6. ✅ Deploy to production

## Support Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Mongoose ODM](https://mongoosejs.com)

---

**🎉 You're all set! Happy coding!**

Last updated: April 2024
