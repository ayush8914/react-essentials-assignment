import TaskItem from './TaskItem'


function TaskList({tasks, deleteTask,editTask}){

    return(
        <div className='task-list'>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask}/>
            ))}
        </div>
    )
}


export default TaskList;