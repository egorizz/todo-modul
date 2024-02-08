import React, { useState } from 'react'
import './task.scss'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = ({ task, switchComplete, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.description)

  const handleEdit = () => {
    if (!task.complete) {
      setIsEditing(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editTask(task.id, editedText)
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditedText(task.description)
    }
  }

  const handleChange = (e) => {
    setEditedText(e.target.value)
  }

  return (
    <li className={`${isEditing ? 'editing' : task.complete ? 'completed' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.complete} onChange={() => switchComplete(task.id)} />
        <label>
          <span className="description">{task.description}</span>
          <span className="created">created {formatDistanceToNow(task.created)} ago</span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit}></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editedText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      )}
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  switchComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}

export default Task
