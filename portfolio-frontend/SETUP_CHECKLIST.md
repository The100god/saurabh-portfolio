# 📋 MongoDB Setup Checklist

Use this checklist to ensure everything is properly configured.

## Installation Phase

- [ ] **Node.js installed**
  - Verify: `node --version` (should be v14+)
  - Download: https://nodejs.org/

- [ ] **MongoDB installed/configured**
  - [ ] Local MongoDB
    - Verify: `mongod --version`
    - Download: https://www.mongodb.com/try/download/community
  - OR [ ] MongoDB Atlas account
    - Created account at: https://www.mongodb.com/cloud/atlas
    - Created cluster
    - Got connection string

## Frontend Setup

- [ ] **Frontend dependencies installed**
  ```bash
  npm install
  ```
  - Verify: `ls node_modules | wc -l` (should show many folders)

- [ ] **`.env.local` file created**
  ```bash
  cat .env.local
  ```
  - Should contain: `REACT_APP_API_URL=http://localhost:5000/api/portfolio`

## Backend Setup

- [ ] **Backend dependencies installed**
  ```bash
  cd server && npm install
  ```
  - Verify: `ls server/node_modules | wc -l`

- [ ] **`.env` file created**
  ```bash
  cat server/.env
  ```
  - Should have: `PORT`, `MONGODB_URI`, `NODE_ENV`

- [ ] **MongoDB connection string confirmed**
  - [ ] Local: `mongodb://localhost:27017/portfolio`
  - [ ] Atlas: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

## Pre-Launch Verification

- [ ] **Port 5000 is available**
  ```bash
  # Windows
  netstat -ano | findstr :5000
  
  # Mac/Linux
  lsof -i :5000
  ```
  - If in use, change PORT in server/.env

- [ ] **Port 3000 is available**
  ```bash
  # Windows
  netstat -ano | findstr :3000
  
  # Mac/Linux
  lsof -i :3000
  ```

- [ ] **All npm scripts are available**
  - Frontend: `npm start` and `npm build`
  - Backend: `npm run dev` and `npm start`

## Running Services

### Terminal 1: MongoDB

- [ ] **MongoDB started**
  ```bash
  mongod
  ```
  - Look for: `[initandlisten] Listening on 127.0.0.1:27017`
  - Keep this running

### Terminal 2: Backend Server

- [ ] **Backend started**
  ```bash
  cd server
  npm run dev
  ```
  - Look for:
    - ✅ MongoDB Connected Successfully
    - 🚀 Server running on http://localhost:5000
  - Keep this running

- [ ] **API is responding**
  ```bash
  curl http://localhost:5000/api/health
  ```
  - Should return: `{"status":"Server is running",...}`

### Terminal 3: Frontend

- [ ] **Frontend started**
  ```bash
  npm start
  ```
  - Look for: Compiled successfully
  - Browser should open automatically to http://localhost:3000

## Functionality Tests

- [ ] **Portfolio page loads**
  - Go to: http://localhost:3000
  - Should see: Your portfolio home page

- [ ] **About page works**
  - Go to: http://localhost:3000/About
  - Should see: Personal information

- [ ] **Admin panel loads**
  - Go to: http://localhost:3000/Admin
  - Should see: Admin interface

- [ ] **Connection status visible**
  - Look at top of admin panel
  - [ ] Green banner: Connected to MongoDB
  - [ ] Orange banner: Using localStorage (MongoDB not connected)

- [ ] **Add a new skill**
  - Admin → Skills tab
  - Add skill with name "Test" and level 50
  - Should see toast: "Skill added!"
  - Should see skill in list

- [ ] **Edit personal information**
  - Admin → Personal tab
  - Change name to "Test Name"
  - Click "Save Changes"
  - Should see toast: "Personal Info updated successfully!"
  - Go to About page
  - Should see "Test Name"

- [ ] **Add a portfolio item**
  - Admin → Portfolio tab
  - Add project
  - Should appear in Portfolio page

- [ ] **Data persists**
  - Refresh the page
  - Data should still be there

- [ ] **Fallback works**
  - Stop MongoDB
  - Refresh admin panel
  - Should see orange banner: "Using Local Storage"
  - Admin panel should still work

## API Endpoint Tests

Use curl or Postman to test:

- [ ] **Health Check**
  ```bash
  curl http://localhost:5000/api/health
  ```
  - Expected: `{"status":"Server is running"...}`

- [ ] **Get All Data**
  ```bash
  curl http://localhost:5000/api/portfolio/data
  ```
  - Expected: JSON with all sections

- [ ] **Add Skill**
  ```bash
  curl -X POST http://localhost:5000/api/portfolio/skills \
    -H "Content-Type: application/json" \
    -d '{"name":"JavaScript","level":85}'
  ```
  - Expected: Updated data with new skill

- [ ] **Delete Skill**
  ```bash
  curl -X DELETE http://localhost:5000/api/portfolio/skills/ID_HERE
  ```
  - Expected: Updated data without skill

## Troubleshooting

If something doesn't work:

### MongoDB Issues

- [ ] **Check MongoDB is running**
  ```bash
  mongod
  ```
  - Should show: `[initandlisten] Listening on`

- [ ] **Check connection string in server/.env**
  - Local: `mongodb://localhost:27017/portfolio`
  - Atlas: Verify credentials and cluster

- [ ] **Check MongoDB Atlas whitelist**
  - Only for Atlas users
  - Need to add your IP address

### Backend Issues

- [ ] **Check backend logs in terminal**
  - Look for error messages
  - Copy error message and check troubleshooting

- [ ] **Restart backend**
  - Stop: Ctrl+C
  - Start: `npm run dev`

- [ ] **Check port 5000**
  ```bash
  netstat -ano | findstr :5000
  ```
  - If in use, change PORT in .env

### Frontend Issues

- [ ] **Check .env.local file**
  ```bash
  cat .env.local
  ```
  - Should have: `REACT_APP_API_URL=http://localhost:5000/api/portfolio`

- [ ] **Check browser console**
  - Press F12
  - Look for red errors
  - Share error message for help

- [ ] **Restart frontend**
  - Stop: Ctrl+C
  - Start: `npm start`

- [ ] **Clear browser cache**
  - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

## Performance Checks

- [ ] **Page load time**
  - Admin panel should load in < 2 seconds
  - Portfolio page should load in < 1 second

- [ ] **Add item performance**
  - Adding skill should respond in < 1 second
  - Should see toast immediately

- [ ] **No console errors**
  - Press F12
  - Console tab should be no red errors

- [ ] **Network tab clean**
  - Should see successful API calls (200)
  - No failed requests (404, 500)

## Security Checks

- [ ] **Never committed `.env` files**
  ```bash
  git status
  ```
  - Should NOT show .env or .env.local

- [ ] **.gitignore has .env**
  ```bash
  cat .gitignore
  ```
  - Should include: `.env`

- [ ] **No secrets in code**
  - Search for password/key: `grep -r "password" src/`
  - Should find nothing

## Documentation Review

- [ ] **Read QUICK_START.md**
  - Understand 5-minute setup

- [ ] **Read MONGODB_SETUP.md**
  - Understand full setup

- [ ] **Read Admin Panel README**
  - Located: `src/containers/AdminPanel/README.md`

- [ ] **Bookmarked Server Docs**
  - Located: `server/README.md`

## Backup & Recovery

- [ ] **Know how to backup data**
  ```bash
  mongodump --db portfolio --out ./backup
  ```

- [ ] **Know how to restore data**
  ```bash
  mongorestore --db portfolio ./backup/portfolio
  ```

- [ ] **Know how to reset admin panel**
  - Click "Reset to Default" button in Admin Panel

## Final Sign-Off

- [ ] **All tests passed**
- [ ] **All services running**
- [ ] **Admin panel working**
- [ ] **Data persisting**
- [ ] **No console errors**
- [ ] **Performance acceptable**

## Ready for Production?

- [ ] **Deployed MongoDB Atlas**
- [ ] **Deployed Backend**
- [ ] **Deployed Frontend**
- [ ] **Updated API URL in production**
- [ ] **Tested production deployment**
- [ ] **Set up monitoring**
- [ ] **Have backup strategy**
- [ ] **Documented admin password** (if added)

## Helpful Links

- [QUICK_START.md](QUICK_START.md) - 5-minute setup
- [MONGODB_SETUP.md](MONGODB_SETUP.md) - Complete guide
- [DOCS_INDEX.md](DOCS_INDEX.md) - All documentation
- [Admin Panel Guide](src/containers/AdminPanel/README.md) - Features
- [Server Guide](server/README.md) - API endpoints

---

✅ **When all items are checked, you're ready to use your portfolio!**

Having issues? Check the troubleshooting section or see [QUICK_START.md#troubleshooting](QUICK_START.md#troubleshooting)

**Happy coding!** 🚀
