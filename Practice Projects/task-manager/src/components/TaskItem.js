import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";



function TaskItem({task}){
    const {deleteTask , toggleTask , editTask} = useTaskContext();
    const [isEditing , setIsEditing] = useState(false); //keep track of the editing state of the task item
    const [editData, setEditData] = useState(task); //keep track of the edited data of the task item

    const handleEdit = ()=>{
        editTask(task.id,editData); //update the task with the edited data
        setIsEditing(false); //set the editing state to false

    }

    const handleCancel = () => {
        setEditData(task); //reset the edited data to the original task data
        setIsEditing(false); //set the editing state to false
    }

    const getPriorityColor = (priority) =>{ //get the color of the priority label based on the priority value
        switch(priority){
            case "high" : return "#ff4757";
            case "medium" : return "#ffa502";
            case "low" : return "#26de81";
            default : return "#ddd";
        }
    }

    if(isEditing){
        return(
            <div className="task-item editing">
                <input type="text" value={editData.title} onChange={(e) => setEditData({...editData , title : e.target.value})} className="task-title" placeholder="Task title..."/>
                <textarea value={editData.description} onChange={(e) => setEditData({...editData , description : e.target.value})} className="task-description" placeholder="Task description..."/>
                <select value={editData.priority} onChange={(e) => setEditData({...editData , priority : e.target.value})} className="task-priority">
                    <option value="high" style={{color : getPriorityColor("high")}}>High</option>
                    <option value="medium" style={{color : getPriorityColor("medium")}}>Medium</option>
                    <option value="low" style={{color : getPriorityColor("low")}}>Low</option>
                </select>
                <div className="edit-actions">
                    <button className="save" onClick={handleEdit}>Save</button>
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }

    return(
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-content">
                <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <span className="priority-badge" style={{backgroundColor:getPriorityColor(task.priority)}}>{task.priority}</span>
                </div>
                  {task.description &&   <p className="task-description">{task.description}</p> }
                <div className="task-meta">
                    <small>Created : {new Date(task.createdAt).toLocaleDateString()}</small>
                </div>

                <div className="task-actions">
                    <button onClick={()=> toggleTask(task.id)} className={`toggle-btn ${task.completed ? "completed" : ""}`}>{task.completed ? "completed" : "Pending"}</button>
                    <button>
                        <i className="fa fa-edit" onClick={() => setIsEditing(true)}></i>
                    </button>
                    <button>
                        <i className="fa fa-trash" onClick={() => deleteTask(task.id)}></i>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default TaskItem;