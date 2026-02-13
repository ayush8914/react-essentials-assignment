import React, { Component } from 'react';

class StudentItem extends Component {
  handleGradeChange = (e) => {
    this.props.onUpdateGrade(this.props.student.id, e.target.value);
  };

  render() {
    const { student, onDelete } = this.props;
    const statusClass = student.passed ? 'passed' : 'failed';

    return (
      <div className={`student-item ${statusClass}`}>
        <div className="info">
          <strong>{student.name}</strong>
          <span>Grade: 
            <input
              type="number"
              min="0"
              max="100"
              value={student.grade}
              onChange={this.handleGradeChange}
            />
          </span>
          <span>Status: {student.passed ? 'Passed' : 'Failed'}</span>
        </div>
        <button className="delete-btn" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </div>
    );
  }
}

export default StudentItem;