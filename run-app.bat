@echo off
echo ========================================
echo   SanjeevaniRural Med - Healthcare App
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run as Administrator
    echo Make sure to check "Add to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed!
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed!
echo.

echo Starting the application...
echo The app will open at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm run dev

pause 