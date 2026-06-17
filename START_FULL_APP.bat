@echo off
echo Starting Backend and Frontend Servers...

echo Starting Backend Server (Port 5000)...
cd backend
start "Local Business Backend Server" cmd /c ".\START_SERVER.bat"

echo Starting Frontend Server (Port 5173)...
cd ..
echo Checking frontend libraries...
call npm install --no-fund --no-audit --quiet
start "Local Business Frontend Server" cmd /k "npm run dev"

echo Both servers have been started in separate windows!
pause
