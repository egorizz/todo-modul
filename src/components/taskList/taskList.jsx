import React, { Component } from 'react'
import './taskList.scss'
import PropTypes from 'prop-types'

import Task from '../task'

const isVisible = (task, filter) =>
  filter === 'all' || (filter === 'active' && !task.complete) || (filter === 'completed' && task.complete)

class TaskList extends Component {
  render() {
    const { tasks, editTask, switchComplete, deleteTask, filter } = this.props
    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            deleteTask={deleteTask}
            key={task.id}
            switchComplete={switchComplete}
            task={task}
            editTask={editTask}
            mode={task.complete ? 'completed' : 'view'}
            hide={!isVisible(task, filter)}
          />
        ))}
      </ul>
    )
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  switchComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
}

TaskList.defaultProps = {
  tasks: [],
}

export default TaskList
