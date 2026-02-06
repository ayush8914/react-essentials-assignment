import { FaMoon, FaSun } from 'react-icons/fa';
import './ToogleTheme.css'
function ToogleTheme(props) {
    return(
        <div className='Toogle-thm'>
            <button onClick={props.toggleDark} className={props.isDark ? "btn-dark" : "btn-light"}>{props.isDark ? <FaSun /> : <FaMoon />} Toogle Theme</button>
        </div>
    );
}

export default ToogleTheme