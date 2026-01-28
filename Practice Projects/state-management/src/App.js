import React , {useState} from 'react';

function App(){
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false
    }

    console.log("Adding task:", newTask);
    setTasks([...tasks, task]);
    setNewTask(''); // Clear input after adding
  }

  const onInputChange = (e) => {
    setNewTask(e.target.value);
  }

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div>
      <h1>My Task List</h1>
      <input type="text" value={newTask} onChange={onInputChange} placeholder="Add a new task" />
      <button onClick={handleAddTask}>Add a task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}> 
              <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} /> 
              {task.title} &nbsp;
              <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    
  );
}

export default App;