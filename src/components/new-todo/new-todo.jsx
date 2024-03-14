import React, { Component } from 'react'
import './new-todo.scss'
import PropTypes from 'prop-types'

class NewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value })
  }

  onMinutesChange = (e) => {
    const { value } = e.target
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      this.setState({ minutes: value })
    }
  }

  onSecondsChange = (e) => {
    const { value } = e.target
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      this.setState({ seconds: value })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state
    if (label.trim() !== '') {
      const totalSeconds = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)
      this.props.onItemAdded(label, totalSeconds)
      this.setState({ label: '', minutes: '', seconds: '' })
    }
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={label}
          autoFocus
        />
        <input className="new-todo-form__timer" onChange={this.onMinutesChange} placeholder="Min" value={minutes} />
        <input className="new-todo-form__timer" onChange={this.onSecondsChange} placeholder="Sec" value={seconds} />
        <button type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}

NewTodo.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTodo
