
function CounterButton({ onButtonClick, children, color='blue' }) {
    return (
        <button onClick={onButtonClick} style={{ backgroundColor: color, color: 'white', padding: '10px 15px', border: 'none', margin: '5px', cursor: 'pointer', borderRadius: '5px' }}>
            {children}
        </button>
    );
}

export default CounterButton;