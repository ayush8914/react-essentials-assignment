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