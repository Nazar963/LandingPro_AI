# 🐳 Docker Setup Guide

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vue.js App    │    │   Lumen API     │    │  Flask AI       │
│   (Port 3000)   │◄──►│   (Port 8000)   │◄──►│  (Port 5000)    │
│   Frontend      │    │   Backend       │    │  Service        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌─────────────────┐
                    │     Redis       │
                    │   (Port 6379)   │
                    │     Cache       │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- At least 4GB RAM available
- 10GB free disk space (for AI models)

### 1. Environment Setup

```bash
# Copy your API key to the environment file
cp .env.example .env
# Edit .env and add your OpenRouter API key
```

### 2. Start Development Environment

```bash
# Start all services
npm run dev

# Or manually
./docker-manager.sh dev
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **AI Service**: http://localhost:5000 (internal)
- **Redis**: localhost:6379 (internal)

## 🛠️ Available Commands

```bash
# Development environment
npm run dev              # Start all services in development mode

# Production environment  
npm run start           # Start all services in production mode

# Management
npm run stop            # Stop all services
npm run logs            # View service logs
npm run clean           # Clean up containers and volumes
```

## 📊 Service Details

### Frontend (Vue.js + Vite)
- **Port**: 3000 (dev) / 80 (prod)
- **Technology**: Vue 3, TypeScript, Tailwind CSS, Pinia
- **Features**: Hot reload, component-based architecture
- **Build**: Optimized production builds with nginx

### Backend (Lumen PHP)
- **Port**: 8000
- **Technology**: Lumen framework, Guzzle HTTP client
- **Role**: API gateway, request routing, validation
- **Features**: CORS enabled, error handling, health checks

### AI Service (Flask Python)
- **Port**: 5000 (internal)
- **Technology**: Flask, OpenAI, Transformers, Llama
- **Features**: Dual AI integration, retry logic, model caching
- **Models**: Downloads automatically on first run

### Redis Cache
- **Port**: 6379 (internal)
- **Purpose**: Session storage, API caching, queue management
- **Persistence**: Data volumes for reliability

## 🔧 Configuration

### Environment Variables

**Development (.env)**:
```bash
OPENROUTER_API_KEY=your_dev_api_key
FLASK_ENV=development
AI_SERVICE_URL=http://ai-service:5000
```

**Production (.env.production)**:
```bash
OPENROUTER_API_KEY=your_prod_api_key
FLASK_ENV=production
AI_SERVICE_URL=http://ai-service:5000
```

### Service Communication

Services communicate through Docker's internal network:
- Frontend → Backend: `http://backend:8000`
- Backend → AI Service: `http://ai-service:5000`
- All Services → Redis: `redis://redis:6379`

## 🐛 Troubleshooting

### Common Issues

**Services won't start**:
```bash
# Check logs
npm run logs

# Clean and restart
npm run clean
npm run dev
```

**AI Service taking too long**:
- First run downloads ~5GB model files
- Subsequent runs are much faster
- Check disk space and internet connection

**Frontend can't reach backend**:
- Verify backend is running: `curl http://localhost:8000/api/health`
- Check CORS configuration in Lumen
- Ensure environment variables are set correctly

**Permission errors**:
```bash
# Fix permissions
sudo chown -R $USER:$USER .
```

### Health Checks

```bash
# Check all services
curl http://localhost:8000/api/health

# Check AI service specifically
curl http://localhost:5000/health

# Check frontend
curl http://localhost:3000
```

## 📈 Production Deployment

### 1. Prepare Environment
```bash
# Copy production config
cp .env.example .env.production
# Edit with production values
```

### 2. Deploy
```bash
# Start production stack
npm run start
```

### 3. SSL Configuration
Add SSL certificates to `nginx/ssl/` directory and update nginx configuration.

### 4. Monitoring
- Monitor logs: `npm run logs`
- Resource usage: `docker stats`
- Health endpoints for load balancers

## 🔒 Security Notes

- API keys are never in source code
- All secrets in environment files
- CORS properly configured
- nginx security headers enabled
- Non-root users in containers

## 📊 Performance Tips

- **AI Service**: Uses model caching for faster responses
- **Backend**: Stateless design for horizontal scaling
- **Frontend**: Optimized builds with code splitting
- **Redis**: Caches API responses and sessions
- **nginx**: Gzip compression and static file serving
