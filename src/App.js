import React, { useState } from "react";
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        completed: false,
        timestamp: new Date().toLocaleString(),
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) task.completed = !task.completed;
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) task.text = newText;
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
    <div className="app-container">
      <h1>TODO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>
      <select
        className="filter-dropdown"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-details">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <div>
                <span className="task-text">{task.text}</span>
                <span className="task-timestamp">{task.timestamp}</span>
              </div>
            </div>
            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  const newText = prompt("Edit your task:", task.text);
                  if (newText) editTask(index, newText);
                }}
              >
                ✏️
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
