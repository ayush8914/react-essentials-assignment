import React, { Component } from 'react';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filter: 'all',       // all | passed | failed
      sortBy: 'none',      // none | grade-asc | grade-desc
      lastAction: null     // for componentDidUpdate demo
    };
  }

  // Lifecycle: Load sample data on mount
  componentDidMount() {
    console.log('App componentDidMount - loading initial data');
    const sampleStudents = [
      { id: 1, name: 'Aarav Patel', grade: 85, passed: true },
      { id: 2, name: 'Priya Sharma', grade: 42, passed: false },
      { id: 3, name: 'Rahul Desai',  grade: 91, passed: true },
      { id: 4, name: 'Neha Singh',   grade: 68, passed: true }
    ];
    this.setState({ students: sampleStudents });
  }

  // Lifecycle: Demo reacting to state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students !== this.state.students) {
      console.log('Students list changed → total:', this.state.students.length);
      this.setState({ lastAction: 'Students updated' });
    }
  }

  // Lifecycle: Cleanup (rarely needed here, but shown for completeness)
  componentWillUnmount() {
    console.log('App componentWillUnmount - cleaning up...');
  }

  addStudent = (newStudent) => {
    this.setState(prev => ({
      students: [
        ...prev.students,
        {
          id: Date.now(), // simple unique id
          name: newStudent.name.trim(),
          grade: Number(newStudent.grade),
          passed: Number(newStudent.grade) >= 50
        }
      ],
      lastAction: 'Student added'
    }));
  };

  updateGrade = (id, newGrade) => {
    const gradeNum = Number(newGrade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      alert('Grade must be between 0 and 100');
      return;
    }

    this.setState(prev => ({
      students: prev.students.map(student =>
        student.id === id
          ? { ...student, grade: gradeNum, passed: gradeNum >= 50 }
          : student
      ),
      lastAction: 'Grade updated'
    }));
  };

  deleteStudent = (id) => {
    if (window.confirm('Delete this student?')) {
      this.setState(prev => ({
        students: prev.students.filter(s => s.id !== id),
        lastAction: 'Student deleted'
      }));
    }
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  setSort = (sortBy) => {
    this.setState({ sortBy });
  };

  getFilteredAndSortedStudents() {
    let list = [...this.state.students];

    // Filter
    if (this.state.filter === 'passed') {
      list = list.filter(s => s.passed);
    } else if (this.state.filter === 'failed') {
      list = list.filter(s => !s.passed);
    }

    // Sort
    if (this.state.sortBy === 'grade-asc') {
      list.sort((a, b) => a.grade - b.grade);
    } else if (this.state.sortBy === 'grade-desc') {
      list.sort((a, b) => b.grade - a.grade);
    }

    return list;
  }

  render() {
    const displayedStudents = this.getFilteredAndSortedStudents();

    return (
      <div className="app">
        <h1>Student Grade Tracker</h1>

        <div className="controls">
          <AddStudentForm onAdd={this.addStudent} />

          <div className="filter-sort">
            <label>Filter: </label>
            <select value={this.state.filter} onChange={e => this.setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>

            <label> Sort: </label>
            <select value={this.state.sortBy} onChange={e => this.setSort(e.target.value)}>
              <option value="none">None</option>
              <option value="grade-asc">Grade ↑</option>
              <option value="grade-desc">Grade ↓</option>
            </select>
          </div>
        </div>

        {this.state.lastAction && (
          <p className="status">Last action: {this.state.lastAction}</p>
        )}

        <StudentList
          students={displayedStudents}
          onUpdateGrade={this.updateGrade}
          onDelete={this.deleteStudent}
        />

        <p className="summary">
          Total students: {this.state.students.length} | Showing: {displayedStudents.length}
        </p>
      </div>
    );
  }
}

export default App;