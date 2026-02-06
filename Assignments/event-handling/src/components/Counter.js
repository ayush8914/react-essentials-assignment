import React , {useState} from "react";
import CounterButton from "./CounterButton";

function Counter() {
    const [count,setCount] = useState (0);

    const increment = () => {
        // setCount(count + 1);
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        if(count === 0) return;
        // setCount(count - 1);
        setCount(prevCount => prevCount - 1);
    };

    const reset = () => {
        setCount(0);
    };  

    return (
        
        <div style={{textAlign:"center",padding:'20px'}}>
            <h2>Counter: {count}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <CounterButton onButtonClick={increment} color="green">Increment</CounterButton>
            <CounterButton onButtonClick={decrement} color="red">Decrement</CounterButton>
            <CounterButton onButtonClick={reset} color="orange">Reset</CounterButton>

        </div>
    );
}

export default Counter;