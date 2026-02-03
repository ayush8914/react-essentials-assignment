/*

- a controlled form component that manages it own state
- integration with our context API to add task globally
- form validation and user experience features
- clean separation of concern - the form only knows about forms things

*/


import { useState } from "react"; //allow functional components to have local state
import { useTaskContext } from "../context/TaskContext";  //allow component to use the context


function TaskForm(){
    const {addTask} = useTaskContext(); //get the addTask function from the context

    const [formData, setFormData] = useState({ //create a local state for the form data
        title : "",
        description : "",
        priority : "medium"
    });

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent the form from submitting
        
        if(!formData.title.trim() || !formData.description.trim())return;
        
        addTask(formData); //add the task to the context
        setFormData({ //reset the form data
            title : "",
            description : "",
            priority : "medium"
        });
    };

    const handleChange = (e)=> {
        const {name , value} = e.target;
        setFormData({...formData , [name] : value});
    }

    

}


export default TaskForm