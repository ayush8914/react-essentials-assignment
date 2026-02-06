import './App.css'
import React from 'react';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      students : [
        {
          id:1,
          name : "John Doe",
          subject : "Maths",
          grade: 80,
          passed : true
        },
        {
          id:2,
          name : "Alesha Doe",
          subject : "English",
          grade: 90,
          passed : true
        },
        {
          id:3,
          name : "Bob Smith",
          subject : "Maths",
          grade: 70,
          passed : false
        }
      ]
    }
  }

  renderStudentList(){
    if(this.state.students.length ===0){
      return <div className='no-students'>
        <p>No Students added yet.Add your first student below!</p>
        </div>
    }

    return this.state.students.map((student) => {
      <div key={student.id} className={`student-card ${student.passed ? 'passed' : 'failed'}`}>
          <div className='student-info'>
              <h3>{student.name}</h3>
              <p><strong>Subject:</strong>{student.subject}</p>
              <p><strong>Grade:</strong>{student.grade}%</p>
          </div>
          <div className='student-status'>
                <span className={`status ${student.passed ? 'passed' : 'failed'}`}>{student.passed ? 'PASSED' : 'FAILED'}</span>
          </div>
      </div>
    })
  }

 render(){
  return(
   <div className='app'>
    <header className='app-header'>
      <h1>Student Grade Tracker</h1>
      <p>Class Component Design</p>
    </header>
   </div>
  )
 }
}

export default App