#!/bin/bash

# LandingPro AI Setup Script
echo "🚀 Setting up LandingPro AI..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📚 Installing Python dependencies..."
cd Text_generative_AI
pip install -r requirements.txt
cd ..

# Install Node.js dependencies
echo "🌐 Installing Node.js dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update your OpenRouter API key in .env file"
echo "2. Run the backend: cd Text_generative_AI && python run.py"
echo "3. Open frontend/index.html in your browser"
echo ""
echo "🔑 Don't forget to add your actual API key to the .env file!"
