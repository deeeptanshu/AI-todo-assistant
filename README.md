# AI To-Do Assistant

**AI To-Do Assistant** is a privacy-first productivity tool powered by local AI (phi3 via Ollama). It organizes your to-do lists, prioritizes tasks, and answers your questions about them — all running on your own desktop, with a modern React frontend and a Python backend (Flask or Streamlit).

---

## ✨ Features

- **AI-Powered Task Organization**: Paste your to-do list and instantly get a grouped, prioritized, actionable plan.
- **Intelligent Q&A**: Ask the AI questions about your list ("What’s most urgent?", "What should I do next?") and get smart, context-aware answers.
- **Modern UI**: Clean, responsive React interface with clear priority grouping.
- **100% Local First**: Your data never leaves your machine. No cloud required.
- **Customizable & Open Source**: Tweak the code, add features, or use as a base for your own productivity tools.

---

## 🖼️ Demo

> _Screenshots coming soon!_

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for the React frontend)
- [Python 3.8+](https://www.python.org/) (for Flask/Streamlit backend)
- [Ollama](https://ollama.com/) (for running the phi3 model locally)

---

### 1. Clone this Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-todo-assistant.git
cd ai-todo-assistant
```

---

### 2. Set Up Ollama and phi3

Install [Ollama](https://ollama.com/) and then pull the phi3 model:

```bash
ollama pull phi3
ollama serve
```

---

### 3. Start the Backend

**For Flask:**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Or for Streamlit:**

```bash
cd backend
pip install -r requirements.txt
streamlit run app.py
```

---

### 4. Start the Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

---

## 🖥️ Desktop App Option

For a true desktop experience, you can wrap the React frontend using [Electron](https://www.electronjs.org/) or [Tauri](https://tauri.app/).  
See `electron.js` in this repo for a minimal working Electron launcher.

---

## 📦 Folder Structure

```
ai-todo-assistant/
├── backend/      # Flask/Streamlit backend
│   └── app.py
├── frontend/     # React frontend
│   └── src/
├── electron.js   # (Optional) Electron main file for desktop app
└── README.md
```

---

## ⚡ Usage

1. Enter your to-do list in the text box.
2. Click **Organize List** to get a prioritized, grouped task list.
3. Ask the AI any question about your list (e.g., "What is the most urgent item?").
4. Enjoy streamlined, focused productivity!

---

## 🛡️ Privacy

All processing happens locally — your lists are never sent to any external server or cloud.

---

## 🙌 Contributing

Pull requests and issues are welcome!  
Feel free to open a discussion or suggest features.

---

## 📄 License

MIT License

---

## ⭐ Credits

- [Ollama](https://ollama.com/) & [phi3](https://ollama.com/library/phi3) for local AI inference
- [React](https://react.dev/) for the frontend
- [Streamlit](https://streamlit.io/) / [Flask](https://flask.palletsprojects.com/) for the backend

---

> Made with ❤️ for personal productivity and privacy.
