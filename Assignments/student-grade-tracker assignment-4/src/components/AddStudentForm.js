import React, { Component } from 'react';

class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, grade } = this.state;

    if (!name.trim()) {
      alert('Name is required');
      return;
    }

    const gradeNum = Number(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      alert('Grade must be 0–100');
      return;
    }

    this.props.onAdd({ name, grade });
    this.setState({ name: '', grade: '' }); // clear form
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-form">
        <input
          type="text"
          name="name"
          placeholder="Student name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <input
          type="number"
          name="grade"
          placeholder="Grade (0-100)"
          min="0"
          max="100"
          value={this.state.grade}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    );
  }
}

export default AddStudentForm;