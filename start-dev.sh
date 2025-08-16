#!/bin/bash

# Campus Helper Frontend Development Server
echo "Starting Campus Helper Frontend..."
echo "Make sure the backend is running at http://localhost:8000"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start development server
echo "Starting development server at http://localhost:3000"
npm run dev
