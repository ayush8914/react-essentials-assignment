import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";


function TaskList(){
    const {tasks , taskStats} = useTaskContext(); //get the tasks from the context

    if(tasks.length ===0){
        return(
            <div className="empty-search">
                <h3>No tasks to show</h3>
                <p>Add a new task to get Started!</p>   
            </div>
        );
    }


    return(
        <div className="task-list">
                <div className="task-stats">
                    <span>Tota: {taskStats.total}</span>
                    <span>Completed: {taskStats.completed}</span>
                    <span> Pending: {taskStats.pending}</span>
                </div>
                <div className="tasks">
                    {tasks.map(task => <TaskItem key={task.id} task={task} />)}
                </div>
        </div>
    );
}

export default TaskList