import './App.css'
import TaskProvider from './context/TaskContext';

function App(){
  return(
    <TaskProvider>
    <div className='App'>
      <h1>Task Manager</h1>
    </div>
    </TaskProvider>
  );
}


export default App;