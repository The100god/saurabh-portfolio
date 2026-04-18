@echo off
echo ================================
echo Portfolio Setup Helper
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed.
    echo Please install it from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK Node.js is installed: %NODE_VERSION%
echo.

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo OK MongoDB is installed locally
) else (
    echo WARNING: MongoDB is not installed locally.
    echo You can:
    echo 1. Install MongoDB: https://docs.mongodb.com/manual/installation/
    echo 2. Use MongoDB Atlas ^(Cloud^): https://www.mongodb.com/cloud/atlas
    echo.
)

REM Frontend setup
echo Installing Frontend Dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo REACT_APP_API_URL=http://localhost:5000/api/portfolio > .env.local
    echo OK Created .env.local
) else (
    echo OK Found .env.local
)

REM Backend setup
echo.
echo Installing Backend Dependencies...
cd server

if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error installing backend dependencies
        pause
        exit /b 1
    )
)

REM Create .env if it doesn't exist
if not exist ".env" (
    type .env.example > .env
    echo OK Created .env
    echo.
    echo IMPORTANT: Configure your MongoDB connection in server\.env:
    echo Local: MONGODB_URI=mongodb://localhost:27017/portfolio
    echo Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
) else (
    echo OK Found .env
)

cd ..

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Configure server\.env with your MongoDB URL
echo 2. Start MongoDB: mongod ^(if using local MongoDB^)
echo 3. Start Backend: cd server ^&^& npm run dev
echo 4. Start Frontend ^(new terminal^): npm start
echo.
echo Your portfolio will be available at: http://localhost:3000
echo Admin panel: http://localhost:3000/Admin
echo.
pause
