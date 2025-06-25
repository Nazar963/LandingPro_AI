
#* This is the huggingface version of the llama-3.2-3B model
# from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# model_id = "meta-llama/Llama-3.2-3B-Instruct"
# tokenizer = AutoTokenizer.from_pretrained(model_id)
# model = AutoModelForCausalLM.from_pretrained(
#     model_id,
#     device_map="auto",  # Automatically map to available devices
#     torch_dtype="auto",  # Use appropriate precision
# )

# gen = pipeline("text-generation", model=model, tokenizer=tokenizer)
# prompt = "Test prompt"
# output = gen(prompt, max_new_tokens=50)
# print(output)

#* This is the free version of the model which takes to validation to be used
# from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# model_id = "EleutherAI/gpt-j-6B"
# tokenizer = AutoTokenizer.from_pretrained(model_id)
# model     = AutoModelForCausalLM.from_pretrained(
#     model_id,
#     device_map="auto",
#     torch_dtype="auto",
# )
# gen = pipeline("text-generation", model=model, tokenizer=tokenizer)
# prompt = "Test prompt"
# output = gen(prompt, max_new_tokens=50)
# print(output)

# # def generate_webpage(prompt: str) -> str:
# #     out = gen(
# #         prompt + "\n\nPlease return ONLY the HTML and CSS.",
# #         max_new_tokens=1500,
# #         do_sample=False,
# #     )[0]["generated_text"]
# #     return out

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

model_id = "meta-llama/Llama-3.2-1B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="auto",  # Automatically map to available devices
    torch_dtype="auto",  # Use appropriate precision
)

gen = pipeline("text-generation", model=model, tokenizer=tokenizer)
prompt = "Test prompt"
output = gen(prompt, max_new_tokens=50)
print(output)