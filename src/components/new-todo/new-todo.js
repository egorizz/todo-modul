import React, { useState } from 'react'
import './new-todo.scss'
import PropTypes from 'prop-types'

const NewTodo = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    const value = e.target.value
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setMinutes(value)
    }
  }

  const onSecondsChange = (e) => {
    const value = e.target.value
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setSeconds(value)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim() !== '') {
      const totalSeconds = parseInt(minutes || '0') * 60 + parseInt(seconds || '0')
      onItemAdded(label, totalSeconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />
      <input className="new-todo-form__timer" onChange={onMinutesChange} placeholder="Min" value={minutes} />
      <input className="new-todo-form__timer" onChange={onSecondsChange} placeholder="Sec" value={seconds} />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}

NewTodo.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTodo
