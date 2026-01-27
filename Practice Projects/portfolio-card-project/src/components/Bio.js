function Bio() {

    const bioText = "Passionate developer with 1.5 years of experience in creating intuitive user experiences and writing clean, efficient code.";
    const skills = ["JavaScript", "React", "CSS", "HTML", "Node.js"];

    return (
        <div className="bio-section">
            <h3>About Me</h3>
            <p className="bio-text">{bioText}</p>
            <h3>Skills</h3>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <span key={index} className="skill-badge">{skill}</span>
                ))}
            </div>
        </div>
    );
}   

export default Bio; 
            