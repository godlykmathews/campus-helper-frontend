@echo off
REM Campus Helper Frontend Development Server
echo Starting Campus Helper Frontend...
echo Make sure the backend is running at http://localhost:8000
echo.

REM Navigate to frontend directory
cd /d "%~dp0"

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start development server
echo Starting development server at http://localhost:3000
npm run dev

pause
