import { createContext , useContext , useReducer } from "react";

//Initial state - this is our application's starting point
const initialState = {
    tasks:[
        {
            id:1,
            title: "Learn React Context",
            description : "Understand how context API works",
            completed : false,
            priority : "high",
            createAt :  new Date().toISOString()
        },
        {
            id:2,
            title: "Learn React Context",
            description : "Understand how context API works",
            completed : false,
            priority : "high",
            createAt :  new Date().toISOString()
        },
        {
            id:3,
            title: "Learn React Context",
            description : "Understand how context API works",
            completed : false,
            priority : "high",
            createAt :  new Date().toISOString()
        }
    ],
    filter : "all", //all ,completed, pending
    searchTerm:'',
    isLoading : false,
    history : [] //for the undo feature
};


// Action types => using contants prevents typos
export const ACTIONS = {
    ADD_TASK : 'ADD_TASK',
    DELETE_TASK : 'DELETE_TASK',
    TOGGLE_TASK : 'TOGGLE_TASK',
    EDIT_TASK : 'EDIT_TASK',
    SET_FILTER : 'SET_FILTER',
    SET_SEARCH_TERM : 'SET_SEARCH',
    UNTO_ACTION : 'UNDO_ACTION',
    SET_LOADING : 'SET_LOADING'
};


//reducer function
const taskReducer = (state , action) =>{
    //always save current state to history before making any changes

    const saveToHistory = (currentState) =>({
        ...currentState,
        history : [...currentState.history , currentState.history.slice(0,9)] //keep only last 10 state
    });

    switch(action.type){
        case ACTIONS.ADD_TASK : 
            const newTask = {
                id : Date.now(),
                title : action.payload.title,
                description : action.payload.description,
                completed : false,
                priority : action.payload.priority,
                createAt : new Date().toISOString()
            };
            return saveToHistory({...state , tasks : [...state.tasks , newTask]});
        
        case ACTIONS.DELETE_TASK :
            return saveToHistory({...state , tasks : state.tasks.filter(task => task.id !== action.payload.id)});
        
        case ACTIONS.TOGGLE_TASK :
            return saveToHistory({...state , tasks : state.tasks.map(task => task.id === action.payload.id ? {...task , completed : !task.completed} : task)}); 

        case ACTIONS.EDIT_TASK :
            return saveToHistory({...state , tasks : state.tasks.map(task => task.id === action.payload.id ? {...task , ...action.payload.updates} : task)});

        case ACTIONS.SET_FILTER :
            return saveToHistory({...state , filter : action.payload});

        case ACTIONS.SET_SEARCH_TERM :
            return saveToHistory({...state , searchTerm : action.payload});

        case ACTIONS.UNTO_ACTION :
            if(state.history.length >0) 
            {
                const [previousState, ...rest] = state.history;
                return {...previousState , history : rest};
            }

            return state;

        case ACTIONS.SET_LOADING :
            return {...state , isLoading : action.payload};

        default :
            throw new Error(`Unknown action type : ${action.type}`);
    }
}



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