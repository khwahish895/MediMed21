#!/bin/bash

# SanjeevaniRural Med Deployment Script

echo "🚑 SanjeevaniRural Med - Deployment Script"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Run linting
echo "🔍 Running linting..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Linting failed"
    exit 1
fi

# Build the project
echo "🏗️ Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "🚀 Deployment Options:"
echo "1. Manual Netlify Deploy:"
echo "   - Go to https://netlify.com"
echo "   - Drag and drop the 'dist' folder"
echo ""
echo "2. GitHub + Netlify:"
echo "   - Push to GitHub: git push origin main"
echo "   - Connect repository to Netlify"
echo ""
echo "3. Local Preview:"
echo "   - Run: npm run preview"
echo ""
echo "📁 Build output: ./dist"
echo "📋 See DEPLOYMENT.md for detailed instructions" 