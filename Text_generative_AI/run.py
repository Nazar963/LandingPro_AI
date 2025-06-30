from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
from page_generator import generate_webpage
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

client = OpenAI(
    base_url=os.getenv('API_BASE_URL', 'https://openrouter.ai/api/v1'),
    api_key=os.getenv('OPENROUTER_API_KEY'),
)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    company_info = data.get('company_info', {})
    user_prompt = data.get('prompt', '')

    prompt_with_context = (
        f"Company Name: {company_info.get('name', '')}\n"
        f"Company Colors: {company_info.get('colors', '')}\n"
        f"Company Logo: {company_info.get('logo', '')}\n"
        f"Company Description: {company_info.get('description', '')}\n"
        f"Landing Page Purpose: {company_info.get('purpose', '')}\n\n"
        f"User Prompt: {user_prompt}"
    )

    max_retries = int(os.getenv('MAX_RETRIES', 3))
    retries = 0

    while retries < max_retries:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "<YOUR_SITE_URL>",
                "X-Title": "<YOUR_SITE_NAME>",
            },
            extra_body={},
            model="microsoft/mai-ds-r1:free",
            messages=[
                {
                    "role": "user",
                    "content": prompt_with_context
                }
            ]
        )
        response_content = completion.choices[0].message.content

        # Check if the output contains only HTML and CSS
        if response_content.strip().startswith('<!DOCTYPE html>'):
            break

        print(f"Attempt {retries + 1}: The generated content is not valid HTML/CSS. Retrying...")
        retries += 1

    if retries == max_retries and not response_content.strip().startswith('<!DOCTYPE html>'):
        return jsonify({"error": "Failed to generate valid HTML/CSS after multiple attempts."}), 400

    # Generate the webpage content using the AI response
    webpage_content = generate_webpage(response_content)

    # Validate the generated webpage content
    retries = 0
    while retries < max_retries:
        if webpage_content.strip().startswith('<!DOCTYPE html>'):
            break

        print(f"Attempt {retries + 1}: The generated webpage content is not valid HTML/CSS. Retrying...")
        webpage_content = generate_webpage(response_content)
        retries += 1

    if retries == max_retries and not webpage_content.strip().startswith('<!DOCTYPE html>'):
        return jsonify({"error": "Failed to generate valid webpage content after multiple attempts."}), 400

    print("Returning response to frontend...")  # Log before returning the response
    return jsonify({"webpage": webpage_content})

@app.route('/generate_page', methods=['POST'])
def generate_page():
    data = request.json
    prompt = data.get('prompt', '')

    # Generate the webpage content
    webpage_content = generate_webpage(prompt)

    print("Returning response to frontend...")  # Log before returning the response
    return jsonify({"webpage": webpage_content})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "text_generative_ai",
        "timestamp": os.getenv('TZ', 'UTC')
    })

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    app.run(debug=debug_mode)