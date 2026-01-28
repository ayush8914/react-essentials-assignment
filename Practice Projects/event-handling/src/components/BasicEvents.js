

function BasicEvents() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  const handleMouseEnter = () => { 
    console.log("Mouse entered the button area.");
    };

    const handleMouseLeave = () => { 
        console.log("Mouse left the button area.");
        };

    const handleInputChange = (event) => {
        console.log("Input changed: ", event.target.value);
    };

    return (
    <div>
        <input type="text" onChange={handleInputChange} placeholder="Type something..." />
        <br/>
        <button onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Click Me</button>
    </div>
    );
}

export default BasicEvents;