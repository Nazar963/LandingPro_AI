# 🚀 LandingPro AI

[![GitHub License](https://img.shields.io/github/license/Nazar963/LandingPro_AI)](https://github.com/Nazar963/LandingPro_AI/blob/main/LICENSE)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-red.svg)](https://flask.palletsprojects.com/)

**LandingPro AI** is an intelligent landing page generator that combines the power of AI with pre-built components to create stunning, responsive landing pages instantly. Simply describe what you want, and watch as AI crafts a complete webpage with HTML and CSS tailored to your needs.

## ✨ Features

- 🤖 **Dual AI Integration**: Uses both OpenRouter API and local language models (Llama 3.2)
- 🎨 **Smart Generation**: Creates complete HTML/CSS landing pages from simple prompts
- 🏢 **Company-Aware**: Incorporates company details like name, colors, logo, and purpose
- 📱 **Responsive Design**: Generated pages work seamlessly across all devices
- 🔧 **Component Library**: Extensive collection of pre-built landing page blocks
- ⚡ **Real-time Generation**: Fast API responses with retry mechanisms for quality assurance
- 🌐 **CORS Enabled**: Ready for frontend integration

## 🛠️ Tech Stack

- **Backend**: Python, Flask
- **AI Models**: OpenRouter API (Microsoft MAI), Meta Llama 3.2-1B
- **Frontend**: HTML, CSS, JavaScript
- **Libraries**: Transformers, OpenAI, Flask-CORS, python-dotenv

## 📁 Project Structure

```
LandingPro_AI/
├── 📁 Text_generative_AI/          # Backend AI service
│   ├── run.py                      # Flask application entry point
│   ├── page_generator.py           # Local AI model handler
│   ├── config.py                   # Configuration settings
│   ├── requirements.txt            # Python dependencies
│   └── 📁 app/                     # Flask app structure
│       ├── __init__.py
│       ├── routes.py
│       ├── models.py
│       └── 📁 templates/
├── 📁 frontend/                    # Web interface
│   ├── index.html                  # Main application interface
│   ├── output.html                 # Generated page preview
│   └── favicon.ico
├── 📁 root/                        # Component library
│   ├── index.html                  # Component showcase
│   ├── index.css                   # Global styles
│   ├── 📁 blocks/                  # Reusable components
│   │   ├── 📁 hero/                # Hero sections (4 variants)
│   │   ├── 📁 features/            # Feature sections (3 variants)
│   │   ├── 📁 about/               # About sections (3 variants)
│   │   ├── 📁 reviews/             # Review sections (3 variants)
│   │   ├── 📁 contacts/            # Contact sections (3 variants)
│   │   ├── 📁 feedback/            # Feedback forms (3 variants)
│   │   ├── 📁 action/              # Call-to-action (2 variants)
│   │   └── 📁 how_it_works/        # Process sections (4 variants)
│   ├── 📁 img/                     # Component assets
│   └── 📁 js/                      # JavaScript utilities
├── .env                            # Environment variables (create from .env.example)
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── setup.sh                       # Automated setup script
├── package.json                    # Node.js dependencies
├── LICENSE                         # MIT License
└── README.md                       # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js (for frontend dependencies)
- OpenRouter API key (optional, for enhanced AI capabilities)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nazar963/LandingPro_AI.git
   cd LandingPro_AI
   ```

2. **Quick Setup (Recommended)**
   ```bash
   ./setup.sh
   ```
   
   Or manually:

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenRouter API key
   ```

4. **Set up the Python environment**
   ```bash
   cd Text_generative_AI
   pip install -r requirements.txt
   ```

5. **Install frontend dependencies**
   ```bash
   npm install
   ```

6. **Configure your API key**
   - Open `.env` file in the root directory
   - Replace `your_openrouter_api_key_here` with your actual OpenRouter API key
   - The file should look like:
     ```bash
     OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
     ```

### Running the Application

1. **Start the Flask backend**
   ```bash
   cd Text_generative_AI
   python run.py
   ```
   The API will be available at `http://localhost:5000`

2. **Open the frontend**
   - Navigate to `frontend/index.html` in your browser
   - Or serve it using a local server for better development experience

## 🎯 Usage

### Basic Generation

Send a POST request to `/generate` with your prompt:

```json
{
  "company_info": {
    "name": "TechCorp",
    "colors": "#3498db, #2ecc71",
    "logo": "https://example.com/logo.png",
    "description": "Innovative technology solutions",
    "purpose": "SaaS product landing page"
  },
  "prompt": "Create a modern landing page for our AI-powered analytics platform"
}
```

### Quick Generation

For simpler use cases, use the `/generate_page` endpoint:

```json
{
  "prompt": "Create a landing page for a fitness app with a hero section and features"
}
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/generate` | POST | Full-featured generation with company context |
| `/generate_page` | POST | Simple generation from prompt only |

## 🎨 Component Library

The project includes a comprehensive library of landing page components:

- **Hero Sections**: 4 different styles for impactful headers
- **Feature Showcases**: 3 layouts for highlighting product benefits  
- **About Sections**: 3 designs for company/product information
- **Customer Reviews**: 3 testimonial layout options
- **Contact Forms**: 3 different contact section designs
- **Feedback Forms**: Interactive feedback collection components
- **Call-to-Action**: 2 compelling CTA section designs
- **How It Works**: 4 step-by-step process explanations

## 🔧 Configuration

### Environment Variables

The application uses environment variables for secure configuration. All sensitive data is stored in the `.env` file:

```bash
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Model Configuration
MODEL_ID=meta-llama/Llama-3.2-1B

# API Configuration
API_BASE_URL=https://openrouter.ai/api/v1
MAX_RETRIES=3
```

### Security Features

- 🔒 **API keys are never stored in source code**
- 🛡️ **`.env` file is automatically ignored by Git**
- 📝 **`.env.example` provides setup template without exposing secrets**
- ⚙️ **All configuration is environment-based for different deployment stages**

### Production Configuration

For production deployment, update these environment variables:

```bash
OPENROUTER_API_KEY=your_production_api_key
FLASK_ENV=production
FLASK_DEBUG=False
MODEL_PATH=path_to_optimized_model
```

### Model Configuration

The application uses two AI approaches:
- **OpenRouter API**: For high-quality, fast generation (requires API key)
- **Local Llama Model**: For offline/private generation (downloads automatically)

## 🛠️ Troubleshooting

### Common Issues

**🔑 API Key Issues**
- Make sure your `.env` file exists in the root directory
- Verify your OpenRouter API key is correctly formatted
- Check that there are no extra spaces or quotes around the API key

**📦 Installation Problems**
- Ensure Python 3.8+ is installed: `python --version`
- For PyTorch installation issues, visit [pytorch.org](https://pytorch.org/get-started/locally/)
- If you encounter permission errors, try using a virtual environment

**🚀 Model Loading Issues**
- The Llama model will download automatically on first run (~5GB)
- Ensure you have sufficient disk space and internet connection
- For GPU acceleration, install CUDA-compatible PyTorch

**🌐 CORS Issues**
- Make sure the Flask backend is running on `http://localhost:5000`
- Check browser console for network errors
- Verify CORS is enabled in `run.py`

### Getting Help

If you encounter issues:
1. Check the terminal output for error messages
2. Verify all dependencies are installed correctly
3. Ensure your `.env` file is properly configured
4. Create an issue on GitHub with error details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact
For questions or feedback, please open an issue in the repository.

## ⭐ Star this repository if you found it helpful!
[![GitHub stars](https://img.shields.io/github/stars/Nazar963/LandingPro_AI?style=social)](https://github.com/Nazar963/LandingPro_AI/stargazers)

## 👨‍💻 Author

**Nazar Al Jendli & Natalia Korikova**


[![GitHub Profile](https://img.shields.io/badge/GitHub-Nazar963-lightgrey)](https://github.com/Nazar963)
[![GitHub Follow](https://img.shields.io/github/followers/Nazar963?style=social)](https://github.com/Nazar963)

## 🙏 Acknowledgments

- OpenRouter for AI API access
- Meta for the Llama language model
- Hugging Face for the Transformers library
- The open-source community for inspiration and tools

---

<p align="center">Made with ❤️ for developers who want to build beautiful landing pages faster</p>
