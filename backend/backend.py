from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form
from openai import OpenAI
import os
import base64

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



def image_to_base64_bytes(file_bytes):
    return base64.b64encode(file_bytes).decode("utf-8")#converts image to byted(0s and 1s) then to text for json to understand(decoder does binary to text)

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"),
)#openrouter client setup

system_message = {
    "role": "system",
    "content": (
        "You are a professional sports analyst. "
        "You provide match insights, tactical analysis, "
        "team and player comparisons. Answer only sports-related questions."
    )
}#informs model about its role
messages = [system_message]    

@app.post("/chat")
async def chat(
    text: str = Form(...),
    image: UploadFile | None = File(None)
):
    # user content
    if image:
        image_bytes = await image.read()
        image_base64 = image_to_base64_bytes(image_bytes)
        user_content = [
            {"type": "text", "text": text},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{image_base64}"
                }
            }
        ]
    else:
        user_content = text
 
    messages.append({
       "role": "user",
       "content": user_content
   })#store user message

    completion = client.chat.completions.create(
        model="google/gemma-3-27b-it",
        messages=messages,
        max_tokens=500,
        temperature=0.7,
    )#calls model to get response

    assistant_reply = completion.choices[0].message.content

    
    messages.append({
        "role": "assistant",
        "content": assistant_reply
    })#store assistant reply

    return{
        "reply": assistant_reply
    }