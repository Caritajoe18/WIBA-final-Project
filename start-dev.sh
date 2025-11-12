#!/bin/bash

# DropIt Development Startup Script

echo "🚚 Starting DropIt Development Environment..."
echo ""

# Check if .env files exist
if [ ! -f backend/.env ]; then
    echo "⚠️  Backend .env file not found!"
    echo "Please copy backend/.env.example to backend/.env and configure it"
    exit 1
fi

if [ ! -f frontend/.env ]; then
    echo "⚠️  Frontend .env file not found!"
    echo "Please copy frontend/.env.example to frontend/.env and configure it"
    exit 1
fi

# Start backend
echo "🔧 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend Development Server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Development servers started!"
echo "📍 Backend API: http://localhost:5000"
echo "📍 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
