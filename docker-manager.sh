#!/bin/bash

# LandingPro AI Docker Setup Script
echo "🚀 Setting up LandingPro AI with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to start development environment
start_dev() {
    echo "🔧 Starting development environment..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Function to start production environment
start_prod() {
    echo "🚀 Starting production environment..."
    docker-compose up --build -d
}

# Function to stop all services
stop_services() {
    echo "⏹️  Stopping all services..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose down
}

# Function to view logs
view_logs() {
    echo "📋 Viewing logs..."
    if [ -f "docker-compose.dev.yml" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose logs -f
    fi
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up containers and volumes..."
    docker-compose -f docker-compose.dev.yml down -v --remove-orphans
    docker-compose down -v --remove-orphans
    docker system prune -f
}

# Main menu
case "${1:-help}" in
    "dev")
        start_dev
        ;;
    "prod")
        start_prod
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        view_logs
        ;;
    "clean")
        cleanup
        ;;
    "help"|*)
        echo "🛠️  LandingPro AI Docker Manager"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  dev     - Start development environment"
        echo "  prod    - Start production environment"
        echo "  stop    - Stop all services"
        echo "  logs    - View service logs"
        echo "  clean   - Clean up containers and volumes"
        echo "  help    - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 dev          # Start development environment"
        echo "  $0 prod         # Start production environment"
        echo "  $0 stop         # Stop all services"
        ;;
esac
