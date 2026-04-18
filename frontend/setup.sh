#!/bin/bash

echo "================================"
echo "Portfolio Setup Helper"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Check if MongoDB is installed (local)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally."
    echo "   You can:"
    echo "   1. Install MongoDB: https://docs.mongodb.com/manual/installation/"
    echo "   2. Use MongoDB Atlas (Cloud): https://www.mongodb.com/cloud/atlas"
    echo ""
fi

# Frontend setup
echo "📦 Setting up Frontend..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "REACT_APP_API_URL=http://localhost:5000/api/portfolio" > .env.local
    echo "✅ Created .env.local"
else
    echo "✅ Found .env.local"
fi

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd server

if [ ! -d "node_modules" ]; then
    npm install
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env"
    echo ""
    echo "📝 Configure your MongoDB connection in server/.env:"
    echo "   Local: MONGODB_URI=mongodb://localhost:27017/portfolio"
    echo "   Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio"
else
    echo "✅ Found .env"
fi

cd ..

echo ""
echo "================================"
echo "Setup Complete! 🎉"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Configure server/.env with your MongoDB URL"
echo "2. Start MongoDB: mongod"
echo "3. Start Backend: cd server && npm run dev"
echo "4. Start Frontend (new terminal): npm start"
echo ""
echo "Your portfolio will be available at: http://localhost:3000"
echo "Admin panel: http://localhost:3000/Admin"
echo ""
