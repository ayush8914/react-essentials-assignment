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
      ],
      newStudet : {
        name : "",
        subject : "",
        grade: ""
      }
    }
  }

  handleInputChange = (event)=>{
    this.setState({
      newStudet : {
        ...this.state.newStudet,
        [event.target.name] : event.target.value
      }
    });
  };


  handleAddSubmit = (event) => {
    event.preventDefault();

    if(!this.state.newStudet.name.trim() || !this.state.newStudet.subject.trim() || !this.state.newStudet.grade.trim()){
      alert("Please fill in all fields!");
      return;
    }


    if(isNaN(this.state.newStudet.grade) || this.state.newStudet.grade < 0 || this.state.newStudet.grade > 100){
      alert("Grade must be a number between 0 and 100!");
      return;
    }

    this.setState({
      students: [
        ...this.state.students,
        {
          id: Date.now(),
          name : this.state.newStudet.name.trim(),
          subject : this.state.newStudet.subject.trim(),
          grade: this.state.newStudet.grade,
          passed : this.state.newStudet.grade >= 60 ? true : false
        }
      ],
      newStudet : {
        name : "",
        subject : "",
        grade: ""
      }
    })
  }

  handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this student?")){
      this.setState({
        students : this.state.students.filter((student) => student.id !== id)
      })
    }
  }

  renderStudentList(){
    if(this.state.students.length ===0){
      return (<div className='no-students'>
        <p>No Students added yet.Add your first student below!</p>
        </div>);
    }

    return this.state.students.map((student) => {
      return(<div key={student.id} className={`student-card ${student.passed ? 'passed' : 'failed'}`}>
          <div className='student-info'>
              <h3>{student.name}</h3>
              <p><strong>Subject:</strong>{student.subject}</p>
              <p><strong>Grade:</strong>{student.grade}%</p>
          </div>
          <div className='student-status'>
                <span className={`status ${student.passed ? 'passed' : 'failed'}`}>{student.passed ? 'PASSED' : 'FAILED'}</span>
          </div>
          <button onClick={() => this.handleDelete(student.id)} className="delete-btn">Delete</button>
      </div>)
    })
  }

 render(){
  return(
   <div className='app'>
    <header className='app-header'>
      <h1>Student Grade Tracker</h1>
      <p>Class Component Design</p>
    </header>
    <main className='app-main'>
      <section className='students-section'>
        <h2>Student List ({this.state.students.length})</h2>
        <div className='students-grid'>
        {this.renderStudentList()}
        </div>
      </section>
        <section className='add-student-section'>
            <h2>Add New Student</h2>
            <form onSubmit={this.handleAddSubmit} className="add-student-form">
              <div className="form-group">
              <input type="text" name="name" placeholder="Name" value={this.state.newStudet.name} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <select name="subject" value={this.state.newStudet.subject} onChange={this.handleInputChange}>
                  <option value="">Select Subject</option>
                  <option value="Maths">Maths</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Computer Science">Computer Science</option>  
                </select>
              </div>
              <div className="form-group">
              <input type="number" name="grade" placeholder="Grade" value={this.state.newStudet.grade} onChange={this.handleInputChange} />
              </div>
              <button type="submit">Add Student</button>
            </form>
        </section>
    </main>
   </div>
  )
 }
}

export default App