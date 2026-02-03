import { createContext , useContext , useReducer } from "react";

//Initial state - this is our application's starting point
const initialState = {
    tasks:[
         {
    id: 1,
    title: "Refactor Task Reducer",
    description: "Clean up reducer logic and fix undo history bug",
    completed: true,
    priority: "high",
    createdAt: "2026-01-20T09:15:00.000Z"
  },
  {
    id: 2,
    title: "Implement Undo Feature",
    description: "Allow reverting last task action using state snapshots",
    completed: false,
    priority: "low",
    createdAt: "2026-01-21T14:30:00.000Z"
  },
  {
    id: 3,
    title: "Add Task Search",
    description: "Filter tasks by title and description in real time",
    completed: false,
    priority: "medium",
    createdAt: "2026-01-22T08:45:00.000Z"
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
    SET_LOADING : 'SET_LOADING',
    DELETE_ALL : 'DELETE_ALL'
};


//reducer function
const taskReducer = (state , action) =>{
    //always save current state to history before making any changes

    const saveToHistory = (currentState) =>({
        ...currentState,
         history: [
    {
      tasks: state.tasks,
      filter: state.filter,
      searchTerm: state.searchTerm,
    },
    ...state.history
    ].slice(0, 10) //keep only last 10 state
    });


    switch(action.type){
        case ACTIONS.ADD_TASK : 
            const newTask = {
                id : Date.now(),
                title : action.payload.title,
                description : action.payload.description,
                completed : false,
                priority : action.payload.priority,
                createdAt : new Date().toISOString()
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

        case ACTIONS.DELETE_ALL :
            return saveToHistory({...state , tasks : []});

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
    const [state, dispatch] = useReducer(taskReducer , initialState);
    
    const addTask = (taskData)=>{
        dispatch({type : ACTIONS.ADD_TASK , payload : taskData});
    };

    const deleteTask = (id)=>{
        dispatch({type : ACTIONS.DELETE_TASK , payload : {id}});
    };

    const toggleTask = (id)=>{
        dispatch({type : ACTIONS.TOGGLE_TASK , payload : {id}});
    };

    const deleteAll = ()=>{
        dispatch({type : ACTIONS.DELETE_ALL});
    }

    const editTask = (id , updates)=>{
        dispatch({type : ACTIONS.EDIT_TASK , payload : {id , updates}});
    };

    const setFilter = (filter)=>{
        dispatch({type : ACTIONS.SET_FILTER , payload : filter});
    };

    const setSearchTerm = (searchTerm)=>{
        dispatch({type : ACTIONS.SET_SEARCH_TERM , payload : searchTerm});
    };

    const undoAction = ()=>{
        dispatch({type : ACTIONS.UNTO_ACTION});
    };

    const setLoading = (isLoading)=>{
        dispatch({type : ACTIONS.SET_LOADING , payload : isLoading});
    }

    //Derived state compute values based on current state

    const filteredTasks = state.tasks.filter(task => {
        const matchesFilter = state.filter === "all" ||  (state.filter === "pending" && !task.completed) || (state.filter === "completed" && task.completed);

        const matchesSearchTerm = state.searchTerm === "" || task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || task.description.toLowerCase().includes(state.searchTerm.toLowerCase());

        return matchesFilter && matchesSearchTerm;
    });


    const taskStats = {
        total : state.tasks.length,
        completed : state.tasks.filter(task => task.completed).length,
        pending : state.tasks.filter(task => !task.completed).length
    }

    const value = {
        tasks : filteredTasks,
        filter : state.filter,
        searchTerm : state.searchTerm,
        isLoading : state.isLoading,
        history : state.history,
        taskStats,
        canUndo : state.history.length > 0,

        //actions
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        setFilter,
        setSearchTerm,
        undoAction,
        setLoading,
        deleteAll
    };



    return(
        <TaskContext.Provider value={value}>
            {children} {/* all child components can have access to this context */}
        </TaskContext.Provider>
    );
};


export default TaskProvider;