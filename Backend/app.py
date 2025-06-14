import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "phi3"  # Lower-memory model

app = Flask(__name__)
CORS(app)

def ask_ollama(prompt):
    data = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False,
    }
    response = requests.post(OLLAMA_URL, json=data)
    response.raise_for_status()
    return response.json()["response"].strip()

@app.route("/api/organize", methods=["POST"])
def organize_todos():
    data = request.get_json()
    todo_list = data.get("todos", "")
    prompt = (
        "You are a helpful AI assistant specialized in organizing to-do lists. "
        f"Here is a user's to-do list: {todo_list}\n"
        "Organize, prioritize, and rewrite it as a clear, actionable checklist. "
        "Flag any vague or duplicate items."
    )
    try:
        ai_reply = ask_ollama(prompt)
        return jsonify({"organized_list": ai_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/ask", methods=["POST"])
def ask_about_todos():
    data = request.get_json()
    question = data.get("question", "")
    todo_list = data.get("todos", "")
    prompt = (
        f"You are a to-do list AI assistant. Here is the user's to-do list: {todo_list}\n"
        f"User question: {question}\n"
        "Answer concisely and helpfully."
    )
    try:
        ai_reply = ask_ollama(prompt)
        return jsonify({"answer": ai_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return "Local To-Do AI Assistant backend (phi3) is running!"

if __name__ == "__main__":
    app.run(debug=True)