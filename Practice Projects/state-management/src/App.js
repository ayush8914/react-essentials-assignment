import React , {useState} from 'react';

function App(){
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    console.log("Adding task:", newTask);
    if (newTask.trim() === '') return; // Prevent adding empty tasks
    setTasks([...tasks, newTask]);
    setNewTask(''); // Clear input after adding
  }

  const onInputChange = (e) => {
    setNewTask(e.target.value);
  }

  return (
    <div>
      <h1>My Task List</h1>
      <input type="text" value={newTask} onChange={onInputChange} placeholder="Add a new task" />
      <button onClick={handleAddTask}>Add a task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
    
  );
}

export default App;