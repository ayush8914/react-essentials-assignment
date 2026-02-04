import './Skills.css'


function Skills(props){
    return(
        <div className='skills-container'>
            <h3 className='title'>Skills</h3>
            <div className='skills'>
                {props.skills.map((skill) => (
                    <span className={`skill-badge ${props.isDark ? "dark" : "light"}`}>{skill}</span>
                ))}
            </div>
        </div>
    );
}

export default Skills