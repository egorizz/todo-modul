import React, { useState } from 'react'
import './new-todo.scss'
import PropTypes from 'prop-types'

const NewTodo = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim() !== '') {
      onItemAdded(label)
      setLabel('')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />
    </form>
  )
}

NewTodo.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTodo
