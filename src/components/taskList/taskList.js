import React from 'react'
import './taskList.scss'
import PropTypes from 'prop-types'

import Task from '../task'

const TaskList = ({ tasks, switchComplete, deleteTask, filter }) => {
  return (
    <ul className="todo-list">
      {tasks
        .filter((task) => {
          return (
            filter === 'all' || (filter === 'active' && !task.complete) || (filter === 'completed' && task.complete)
          )
        })
        .map((task) => (
          <Task
            deleteTask={deleteTask}
            key={task.id}
            switchComplete={switchComplete}
            task={task}
            mode={task.complete ? 'completed' : 'view'}
          />
        ))}
    </ul>
  )
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
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
}

TaskList.defaultProps = {
  tasks: [],
}

export default TaskList
