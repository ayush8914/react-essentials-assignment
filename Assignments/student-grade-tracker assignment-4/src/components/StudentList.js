import React, { Component } from 'react';
import StudentItem from './StudentItem';

class StudentList extends Component {
  render() {
    const { students, onUpdateGrade, onDelete } = this.props;

    if (students.length === 0) {
      return <p className="empty">No students to display</p>;
    }

    return (
      <div className="student-list">
        {students.map(student => (
          <StudentItem
            key={student.id}
            student={student}
            onUpdateGrade={onUpdateGrade}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

export default StudentList;