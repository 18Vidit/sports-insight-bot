from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os, base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

MODEL = "qwen/qwen-2.5-vl-7b-instruct"
MAX_MESSAGES = 10

system_message = {
    "role": "system",
    "content": (
        "You are a professional sports analyst. "
        "Provide tactical analysis, match insights, "
        "and player/team comparisons."
    )
}

# Single conversation memory
messages = [system_message]

def image_to_base64(file_bytes):
    return base64.b64encode(file_bytes).decode("utf-8")

def trim_messages():
    global messages
    if len(messages) > MAX_MESSAGES:
        messages = [messages[0]] + messages[-(MAX_MESSAGES - 1):]

@app.post("/chat")
async def chat(
    text: str = Form(...),
    image: UploadFile | None = File(None)
):
    global messages

    # image to text summary
    if image:
        image_bytes = await image.read()
        image_base64 = image_to_base64(image_bytes)

        vision_prompt = [{
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this sports image in detail for later tactical discussion."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{image_base64}"
                    }
                }
            ]
        }]

        vision_response = client.chat.completions.create(
            model=MODEL,
            messages=vision_prompt,
            max_tokens=400,
        )

        image_summary = vision_response.choices[0].message.content

        # Store image context as text
        messages.append({
            "role": "system",
            "content": f"Image context: {image_summary}"
        })

    # normal text
    messages.append({
        "role": "user",
        "content": text
    })

    trim_messages()

    completion = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        max_tokens=300,
        temperature=0.7,
    )

    reply = completion.choices[0].message.content

    messages.append({
        "role": "assistant",
        "content": reply
    })

    trim_messages()

    return {
        "reply": reply
    }