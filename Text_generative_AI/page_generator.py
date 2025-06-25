import logging
import os
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# model_id = "EleutherAI/gpt-j-6B"
model_id = os.getenv('MODEL_ID', 'meta-llama/Llama-3.2-1B')

logging.info("Starting the model loading process...")

try:
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    logging.info("Tokenizer loaded successfully.")

    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        device_map="auto",
        torch_dtype="auto",
    )
    logging.info("Model loaded successfully.")

    gen = pipeline("text-generation", model=model, tokenizer=tokenizer)
    logging.info("Pipeline created successfully.")

    # Test the pipeline with a sample prompt
    prompt = "test prompt"
    logging.info("Testing the pipeline with a sample prompt...")
    output = gen(prompt, max_new_tokens=50)
    logging.info("Pipeline test output: %s", output)

except Exception as e:
    logging.error("An error occurred during the model loading or pipeline creation: %s", str(e))
    raise

def generate_webpage(prompt: str) -> str:
    try:
        logging.info("Generating webpage with prompt: %s", prompt)
        out = gen(
            prompt + "\n\n very important: Please return ONLY the HTML and CSS.",
            max_new_tokens=1500,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
        )[0]["generated_text"]
        logging.info("Generated webpage content successfully.")
        print("\n\nthis is the page generate", out)
        print("\n\n")
        return out
    except Exception as e:
        logging.error("An error occurred during webpage generation: %s", str(e))
        raise