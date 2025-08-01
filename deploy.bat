@echo off
echo 🚑 SanjeevaniRural Med - Deployment Script
echo ==========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Run linting
echo 🔍 Running linting...
call npm run lint

if %errorlevel% neq 0 (
    echo ❌ Linting failed
    pause
    exit /b 1
)

REM Build the project
echo 🏗️ Building project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.
echo 🚀 Deployment Options:
echo 1. Manual Netlify Deploy:
echo    - Go to https://netlify.com
echo    - Drag and drop the 'dist' folder
echo.
echo 2. GitHub + Netlify:
echo    - Push to GitHub: git push origin main
echo    - Connect repository to Netlify
echo.
echo 3. Local Preview:
echo    - Run: npm run preview
echo.
echo 📁 Build output: ./dist
echo 📋 See DEPLOYMENT.md for detailed instructions
pause 