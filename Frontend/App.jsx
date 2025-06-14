import React, { useState } from "react";
import "./App.css";

// --- Parser for numbered AI output ---
function parseOrganizedToDoList(text) {
  // Split by numbered pattern
  const taskRegex = /\d+\.\s+([^-]+)[-.–]+(.+?)(?=(?:\d+\.\s+)|$)/gs;
  const matches = text.matchAll(taskRegex);
  const tasks = [];
  for (const match of matches) {
    // [full, title, description]
    let title = match[1]?.trim() || "";
    let description = match[2]?.trim() || "";

    // Guess priority from description
    let priority = "low";
    if (/priority.*high|urgent|data loss|immediate/i.test(description)) priority = "high";
    else if (/priority.*medium|important/i.test(description)) priority = "medium";

    tasks.push({ title, description, priority });
  }
  return tasks;
}

const PRIORITY_META = {
  high:   { label: "High Priority",   color: "#e74c3c", emoji: "🔴" },
  medium: { label: "Medium Priority", color: "#f1c40f", emoji: "🟡" },
  low:    { label: "Low Priority",    color: "#27ae60", emoji: "🟢" }
};

function groupTasks(tasks) {
  return {
    high: tasks.filter(t => t.priority === "high"),
    medium: tasks.filter(t => t.priority === "medium"),
    low: tasks.filter(t => t.priority === "low"),
  };
}

function App() {
  const [todos, setTodos] = useState("");
  const [organized, setOrganized] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingOrg, setLoadingOrg] = useState(false);
  const [loadingQ, setLoadingQ] = useState(false);

  const handleOrganize = async () => {
    setLoadingOrg(true);
    setOrganized("");
    const res = await fetch("http://localhost:5000/api/organize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos }),
    });
    const data = await res.json();
    setOrganized(data.organized_list || data.error || "No response");
    setLoadingOrg(false);
  };

  const handleAsk = async () => {
    setLoadingQ(true);
    setAnswer("");
    const res = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos, question }),
    });
    const data = await res.json();
    setAnswer(data.answer || data.error || "No response");
    setLoadingQ(false);
  };

  // --- Parse and group tasks here ---
  const tasks = organized ? parseOrganizedToDoList(organized) : [];
  const grouped = groupTasks(tasks);

  return (
    <div className="container">
      <h1>📝 AI To-Do Assistant (phi3)</h1>
      <textarea
        rows={5}
        placeholder="Paste or type your to-do list here, separated by commas or lines..."
        value={todos}
        onChange={(e) => setTodos(e.target.value)}
      />
      <div>
        <button onClick={handleOrganize} disabled={loadingOrg || !todos}>
          {loadingOrg ? "Organizing..." : "Organize List"}
        </button>
      </div>

      {/* --- Enhanced Organized List Display --- */}
      {tasks.length > 0 && (
        <div className="output">
          <h2>Organized To-Do List:</h2>
          {["high", "medium", "low"].map(level => (
            grouped[level].length > 0 && (
              <section key={level} className="priority-section">
                <h3 style={{ color: PRIORITY_META[level].color }}>
                  {PRIORITY_META[level].emoji} {PRIORITY_META[level].label}
                </h3>
                <ul className="todo-list">
                  {grouped[level].map((task, idx) => (
                    <li key={idx} className="todo-card" style={{
                      borderLeft: `6px solid ${PRIORITY_META[level].color}`,
                    }}>
                      <span className="todo-title">{task.title}</span>
                      <div className="todo-desc">{task.description}</div>
                    </li>
                  ))}
                </ul>
              </section>
            )
          ))}
        </div>
      )}

      {/* fallback if parsing fails */}
      {organized && tasks.length === 0 && (
        <div className="output">
          <h2>Organized To-Do List:</h2>
          <pre className="wrapped-pre">{organized}</pre>
        </div>
      )}

      <div className="qa-section">
        <input
          type="text"
          placeholder="Ask the AI about your list (e.g. What's most urgent?)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAsk} disabled={loadingQ || !todos || !question}>
          {loadingQ ? "Thinking..." : "Ask AI"}
        </button>
      </div>
      {answer && (
        <div className="output">
          <h2>AI Answer:</h2>
          <pre className="wrapped-pre">{answer}</pre>
        </div>
      )}
      <footer>
        <hr />
        <p>
          Powered by <a href="https://ollama.com/library/phi3" target="_blank" rel="noreferrer">phi3 via Ollama</a> · Runs 100% locally
        </p>
      </footer>
    </div>
  );
}

export default App;