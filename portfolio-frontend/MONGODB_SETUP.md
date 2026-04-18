# Portfolio Admin Panel with MongoDB

Complete setup guide for the React portfolio with admin panel and MongoDB backend.

## Project Structure

```
portfolio/
├── src/                           # React frontend
│   ├── containers/
│   │   └── AdminPanel/           # Admin panel component
│   ├── context/
│   │   └── DataContext.js        # Global state with MongoDB API calls
│   ├── hooks/
│   │   └── useData.js            # Custom hook for data context
│   └── App.js
├── server/                        # Express + MongoDB backend
│   ├── index.js                  # Main server
│   ├── models/
│   │   └── PortfolioData.js     # MongoDB schema
│   ├── routes/
│   │   └── portfolio.js          # API endpoints
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── .env.local                    # Frontend API configuration
└── package.json
```

## Setup Instructions

### 1. Prerequisites

- Node.js v14+ and npm
- MongoDB (local or cloud)
- Git (optional)

### 2. Frontend Setup

#### Install Dependencies

```bash
npm install
```

#### Create Frontend Environment File

Create `.env.local` in project root:

```env
REACT_APP_API_URL=http://localhost:5000/api/portfolio
```

### 3. Backend Setup

#### Install Server Dependencies

```bash
cd server
npm install
```

#### Create Server Environment File

```bash
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Start Services

**Terminal 1 - MongoDB (if local):**

```bash
mongod
```

**Terminal 2 - Start Backend Server:**

```bash
cd server
npm run dev
```

Expected output:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5000
📊 API Base: http://localhost:5000/api
```

**Terminal 3 - Start React App:**

```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

### Access Admin Panel

1. Navigate to `http://localhost:3000/Admin`
2. Edit your portfolio information
3. Add/delete skills, projects, experience, education, and certificates
4. All changes sync with MongoDB automatically

### Data Persistence

- ✅ Changes save to MongoDB immediately
- ✅ Data persists across browser sessions
- ✅ Works offline using localStorage as fallback
- ✅ Auto-sync when connection restored

## Features

### Admin Panel Features

- **Personal Information:** Edit name, role, summary, contacts
- **Skills:** Add/remove technical skills with proficiency levels
- **Portfolio:** Manage project links and categories
- **Experience:** Document work history
- **Education:** Track degrees and certifications
- **Certificates:** Add professional certifications

### Data Synchronization

- Real-time updates across all pages
- Toast notifications for user feedback
- Automatic localStorage fallback if server unavailable
- One-click reset to default data

## API Reference

### Health Check

```bash
curl http://localhost:5000/api/health
```

### Get All Data

```bash
curl http://localhost:5000/api/portfolio/data
```

### Add a Skill

```bash
curl -X POST http://localhost:5000/api/portfolio/skills \
  -H "Content-Type: application/json" \
  -d '{"name": "React", "level": 90}'
```

### Add a Portfolio Item

```bash
curl -X POST http://localhost:5000/api/portfolio/portfolio \
  -H "Content-Type: application/json" \
  -d '{"name": "My Project", "link": "https://...", "category": "Featured"}'
```

### Reset All Data

```bash
curl -X POST http://localhost:5000/api/portfolio/reset
```

See [server/README.md](server/README.md) for complete API documentation.

## Troubleshooting

### MongoDB Connection Failed

1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`
3. Verify MongoDB is installed correctly

### Server Not Starting

```bash
# Check if port 5000 is available
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# If occupied, change PORT in .env
```

### Frontend Can't Connect to API

1. Verify server is running on port 5000
2. Check `.env.local` has correct `REACT_APP_API_URL`
3. Check browser console for CORS errors
4. Restart React dev server

### Data Not Saving

1. Open browser console (F12)
2. Check for error messages
3. Verify MongoDB is connected
4. Try admin panel reset button

## Fallback Behavior

If MongoDB server is unavailable:

1. ✅ Frontend automatically uses localStorage
2. ✅ All features work locally
3. ✅ Data persists across refreshes
4. ✅ Syncs to MongoDB when server returns

No configuration needed - it's automatic!

## Deployment

### Deploy Backend

**Option 1: Heroku**

```bash
heroku create portfolio-api
heroku addons:create mongolab:sandbox
git push heroku main
```

**Option 2: Railway.app**

Connect GitHub repo, add MongoDB service, deploy.

**Option 3: Vercel (Serverless)**

Use MongoDB Atlas, deploy API functions to Vercel.

### Deploy Frontend

**Option 1: Vercel**

```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Update `.env.local` with production API URL:

```env
REACT_APP_API_URL=https://your-api-domain.com/api/portfolio
```

## Database Backup

### Local MongoDB Backup

```bash
# Backup
mongodump --db portfolio --out ./backup

# Restore
mongorestore --db portfolio ./backup/portfolio
```

### MongoDB Atlas Backup

1. Open MongoDB Atlas → Cluster → Backup
2. Create on-demand backup
3. Download backup file

## Next Steps

1. ✅ Complete setup with MongoDB
2. ✅ Access admin panel
3. ✅ Populate your portfolio content
4. ✅ Test all features
5. ✅ Deploy to production
6. ✅ Share your updated portfolio

## File Organization

### Key Files to Modify

- `src/context/DataContext.js` - Data management (API calls)
- `src/containers/AdminPanel/index.jsx` - Admin UI
- `server/index.js` - Backend server configuration
- `server/routes/portfolio.js` - API endpoints

### Generated Files (Don't Edit)

- `build/` - Production build
- `node_modules/` - Dependencies
- `.env` - Environment variables (don't commit)

## Performance Tips

1. **Enable MongoDB Indexing:**
   - Email and name fields already indexed
   - Atlas automatically optimizes queries

2. **Optimize Frontend:**
   - Use React DevTools to check renders
   - Lazy load components if needed

3. **Monitor API:**
   - Check server logs for slow queries
   - Use MongoDB Compass to inspect data

## Security Recommendations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong MongoDB passwords
   - Rotate credentials regularly

2. **Add Authentication (Optional):**
   - Basic auth for admin panel
   - JWT tokens for API
   - Implement in `server/index.js`

3. **Validate Input:**
   - Server-side validation
   - Sanitize user inputs
   - Rate limiting for API

## Useful Commands

```bash
# Frontend
npm start              # Start dev server
npm build              # Build for production
npm test               # Run tests

# Backend
npm run dev            # Start with nodemon
npm start              # Start production

# MongoDB (local)
mongod                 # Start MongoDB
mongosh                # Connect to shell
```

## Support & Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Project Repository Issues](./issues)

## License

This portfolio project is open source.

## Credits

Built with React, Express.js, and MongoDB.

---

**Happy coding!** 🚀
