#!/bin/bash

# LandingPro AI Docker Setup Script
echo "🚀 Setting up LandingPro AI with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "🔑 Please edit .env file and add your OpenRouter API key!"
fi

# Make docker manager executable
chmod +x docker-manager.sh

echo "✅ Setup complete!"
echo ""
echo "📋 Available commands:"
echo "  npm run dev     - Start development environment"
echo "  npm run start   - Start production environment"
echo "  npm run stop    - Stop all services"
echo "  npm run logs    - View service logs"
echo "  npm run clean   - Clean up containers"
echo ""
echo "🔗 Access URLs (after starting):"
echo "  Frontend:    http://localhost:3000"
echo "  Backend API: http://localhost:8000/api"
echo "  Health:      http://localhost:8000/api/health"
echo ""
echo "🔑 Don't forget to add your actual OpenRouter API key to the .env file!"
echo ""
echo "🚀 Ready to start? Run: npm run dev"
