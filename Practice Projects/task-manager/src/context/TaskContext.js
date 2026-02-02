import { createContext , useContext } from "react";


//step1: create the context;

const TaskContext = createContext();  //empty args means we are not setting a default value we will handle this with our custom hook.

//step2 : custom hook for easier  usage
export const useTaskContext = () =>{
    const context = useContext(TaskContext);
    if(!context){
        throw new Error("useTaskContext must be used within a TaskContextProvider");
    }
    return context;
};


//step3: create the provider component
export const TaskProvider = ({children})=>{
    const value = {

    };

    return(
        <TaskContext.Provider value={value}>
            {children} {/* all child components can have access to this context */}
        </TaskContext.Provider>
    );
};


export default TaskProvider;