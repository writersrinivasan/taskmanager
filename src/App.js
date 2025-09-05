import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * TaskManager Component
 * A minimal React application for managing daily tasks
 */
function App() {
  // State for storing tasks and current input
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  
  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handler for adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      createdAt: new Date()
    };
    
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  // Handler for toggling task completion status
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handler for removing a task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Count of completed and remaining tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      
      {/* Task Input Form */}
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      {/* Task List */}
      <ul className="task-list">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-left">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </div>
            <button 
              className="delete-button"
              onClick={() => removeTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* Task Statistics */}
      {tasks.length > 0 && (
        <div className="stats">
          <p>
            {completedTasks} completed, {remainingTasks} remaining
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
