import TaskAction from './TaskAction';


const TaskItem = ({task, deleteTask, editTask}) => {
    return(
        <div className='task-item' key={task.id} > 
            <h3>{task.text}</h3>
            <p>{task.description}</p>
            <TaskAction task={task} deleteTask={deleteTask} editTask={editTask}/>
        </div>
    )
}


export default TaskItem