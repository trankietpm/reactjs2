import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: ' Task 1' },
    { id: 2, text: ' Task 2' },
    { id: 3, text: ' Task 3' }
  ]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskText, setEditingTaskText] = useState('');

  const startEditingTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
    setEditingTaskText(taskToEdit.text);
  };

  const saveEditedTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const addNewTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTaskText }]);
      setNewTaskText('');
    }
  };

  const deleteTask = (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      setEditingTask(null);
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="addtask">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(event) => setNewTaskText(event.target.value)}
        />
         <button className="add-button" onClick={addNewTask}>Add</button>
      </div>
      <ul className="tasklist">
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask && editingTask.id === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTaskText}
                  onChange={(event) => setEditingTaskText(event.target.value)}
                />
                <div className="edit-actions">
                  <button className="save-button" onClick={() => saveEditedTask(task.id, editingTaskText)}>Save</button>
                  <button className="cancel-button" onClick={() => setEditingTask(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="task-actions">
                  <button className="edit-button" onClick={() => startEditingTask(task.id)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
