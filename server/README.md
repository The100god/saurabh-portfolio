# MongoDB Integration Setup Guide

## Overview

The portfolio now supports MongoDB for persistent data storage. The admin panel seamlessly switches between MongoDB and localStorage depending on availability.

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

#### 1. Server Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

#### 2. Start MongoDB

**Option A: Local MongoDB**

```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**

Update `.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
```

#### 3. Start Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

#### 4. Frontend Configuration

Create `.env.local` in the React app root:

```env
REACT_APP_API_URL=http://localhost:5000/api/portfolio
```

#### 5. Start React App

In a new terminal:

```bash
npm start
```

## Architecture

### Backend Structure

```
server/
├── index.js              # Main server file
├── package.json          # Server dependencies
├── .env.example          # Environment template
├── models/
│   └── PortfolioData.js  # MongoDB schema
└── routes/
    └── portfolio.js      # API endpoints
```

### API Endpoints

#### Get All Data
```
GET /api/portfolio/data
```
Returns all portfolio data with all sections.

#### Personal Info
```
PUT /api/portfolio/personal-info
```
Update personal information.

#### Skills
```
POST /api/portfolio/skills          # Add skill
DELETE /api/portfolio/skills/:id    # Delete skill
PUT /api/portfolio/skills           # Update all skills
```

#### Portfolio Items
```
POST /api/portfolio/portfolio       # Add project
DELETE /api/portfolio/portfolio/:id # Delete project
PUT /api/portfolio/portfolio        # Update all projects
```

#### Experience
```
POST /api/portfolio/experience      # Add experience
DELETE /api/portfolio/experience/:id # Delete experience
PUT /api/portfolio/experience       # Update all experience
```

#### Education
```
POST /api/portfolio/education       # Add education
DELETE /api/portfolio/education/:id # Delete education
PUT /api/portfolio/education        # Update all education
```

#### Certificates
```
POST /api/portfolio/certificates    # Add certificate
DELETE /api/portfolio/certificates/:id # Delete certificate
PUT /api/portfolio/certificates     # Update all certificates
```

#### Reset
```
POST /api/portfolio/reset           # Reset to default data
```

#### Health Check
```
GET /api/health                     # API status
```

## Data Structure

### MongoDB Schema

```javascript
{
  personalInfo: {
    name: String,
    role: String,
    age: String,
    address: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    summary: String
  },
  skills: [
    {
      _id: ObjectId,
      name: String,
      level: Number // 0-100
    }
  ],
  portfolio: [
    {
      _id: ObjectId,
      name: String,
      link: String,
      category: String
    }
  ],
  experience: [
    {
      _id: ObjectId,
      company: String,
      position: String,
      duration: String,
      description: String
    }
  ],
  education: [
    {
      _id: ObjectId,
      institution: String,
      degree: String,
      year: String,
      description: String
    }
  ],
  certificates: [
    {
      _id: ObjectId,
      name: String,
      issuer: String,
      date: String,
      link: String
    }
  ]
}
```

## Fallback Behavior

The frontend **automatically falls back to localStorage** if the MongoDB server is unavailable:

1. App tries to fetch data from API on load
2. If API is unreachable, uses localStorage as fallback
3. Works seamlessly - no manual intervention needed
4. Data is persisted locally until API is available

### Check Status

In browser console:
```javascript
// Check if using MongoDB or localStorage
console.log(window.useLocalStorage); // true = localStorage, false = MongoDB
```

## Development

### Run Both Services

**Terminal 1 - Start MongoDB:**
```bash
mongod
```

**Terminal 2 - Start Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 3 - Start React App:**
```bash
npm start
```

### Database Inspection

**Using MongoDB Compass:**

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to `mongodb://localhost:27017`
3. View the `portfolio` database
4. Inspect collections in real-time

**Using MongoDB Shell:**

```bash
# Connect
mongosh

# Use database
use portfolio

# View collection
db.portfoliodatas.find()

# View specific document
db.portfoliodatas.findOne()
```

## MongoDB Setup Options

### Option 1: Local MongoDB

**Windows:**
```bash
# Install via Chocolatey
choco install mongodb

# Or download MSI from: https://www.mongodb.com/try/download/community
```

**Mac:**
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Option 3: Docker

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name portfolio-mongo mongo:latest
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network/firewall settings

### API Endpoint Not Found

**Error:** `404 Not Found`

**Solution:**
- Ensure server is running on port 5000
- Check API endpoint URL in frontend `.env.local`
- Verify server console for errors

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- CORS is already configured in server
- If custom domain, update CORS origin in `index.js`:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### Data Not Syncing

**Solution:**
- Check browser console for errors
- Verify MongoDB is running
- Check server logs for database errors
- Try resetting data via admin panel

## Production Deployment

### Environment Variables

Create `.env` for production:

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=production
```

### Deploy Server

**Option 1: Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create portfolio-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

**Option 2: Railway.app**

1. Connect GitHub repo
2. Add MongoDB service
3. Deploy

**Option 3: AWS/Azure/DigitalOcean**

Deploy Node.js app using their platforms, add MongoDB instance.

### Update Frontend API URL

Create `.env.production`:

```env
REACT_APP_API_URL=https://your-api-domain.com/api/portfolio
```

## Data Backup

### Backup MongoDB Local

```bash
# Backup
mongodump --db portfolio --out ./backup

# Restore
mongorestore --db portfolio ./backup/portfolio
```

### Backup MongoDB Atlas

1. Open MongoDB Atlas Dashboard
2. Cluster → Backup
3. Create on-demand backup
4. Download backup file

## Monitoring

Monitor server health:

```bash
# In browser or API client
GET http://localhost:5000/api/health
```

Response:
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Performance Tips

1. **Index Frequently Queried Fields:**
   ```javascript
   portfolioDataSchema.index({ 'personalInfo.email': 1 });
   ```

2. **Limit Data Transfers:**
   - Frontend caches data after first fetch
   - Only updates changed sections

3. **Use Connection Pooling:**
   - Already configured in Mongoose

4. **Monitor Database:**
   - Use MongoDB Atlas Metrics
   - Check query performance

## Security

### Best Practices

1. **Use Environment Variables:**
   - Never commit `.env` files
   - Use `.env.example` as template

2. **Add Authentication (Optional):**
   ```javascript
   const auth = require('express-basic-auth');
   app.use(auth({
     users: { 'admin': 'password123' }
   }));
   ```

3. **Validate Input:**
   ```javascript
   const { body, validationResult } = require('express-validator');
   // Add validation middleware
   ```

4. **Rate Limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
   ```

## Next Steps

1. ✅ Set up MongoDB locally or in cloud
2. ✅ Install server dependencies
3. ✅ Configure `.env` files
4. ✅ Start server and database
5. ✅ Access admin panel and manage content
6. ✅ Deploy to production when ready

## Support

For issues:

1. Check server console logs
2. Verify MongoDB connection
3. Test API endpoints manually
4. Check browser console for frontend errors
5. Review troubleshooting section
