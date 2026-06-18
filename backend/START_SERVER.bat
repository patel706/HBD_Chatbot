@echo off
REM Backend Server Startup Script for Windows
REM Start the HBD Local Business AI Backend API Server

:: Use %~dp0 to reference the directory containing this script
cd /d "%~dp0"
set PYTHONIOENCODING=utf-8

echo.
echo ====================================================================
echo HBD Local Business AI - Backend Server
echo ====================================================================
echo.
echo Database: %~dp0google_map_data.db
echo Starting FastAPI server on http://127.0.0.1:5000
echo.
echo Press CTRL+C to stop the server
echo.
echo ====================================================================
echo.

:: Check and Install Missing Libraries
echo Checking for required libraries...
".\.venv\Scripts\python.exe" -m pip install -r requirements.txt --quiet

:: Set DB path relative to script directory
set DATABASE_URL=%~dp0google_map_data.db

:: Ensure database exists, migrate if missing
if not exist "%DATABASE_URL%" (
    echo Database file missing. Running database migration first...
    ".\.venv\Scripts\python.exe" migrate_data.py
)

:: Use relative path to the virtual environment in the root folder
".\.venv\Scripts\python.exe" -m uvicorn api:app --host 127.0.0.1 --port 5000 --reload

pause
