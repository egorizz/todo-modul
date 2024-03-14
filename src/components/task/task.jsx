import React, { Component } from 'react'
import './task.scss'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editedText: props.task.description,
      timer: props.task.timeSeconds || 720,
      timerOn: false,
    }
  }

  timeout = null

  toggleTimer = () => {
    const { task } = this.props
    if (task.complete) {
      return
    }
    this.setState((prevState) => ({ timerOn: !prevState.timerOn }))
  }

  componentDidMount() {
    this.handleTimer()
  }

  componentDidUpdate(prevProps, prevState) {
    // Проверяем изменились ли timerOn или timer по сравнению с предыдущим состоянием
    if (prevState.timerOn !== this.state.timerOn || prevState.timer !== this.state.timer) {
      this.handleTimer()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleTimer = () => {
    const { timerOn, timer } = this.state

    if (timerOn && timer > 0) {
      this.timeout = setTimeout(() => {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }))
      }, 1000)
    } else {
      clearTimeout(this.timeout)

      if (!timerOn || timer <= 0) {
        if (timer <= 0) {
          this.setState({ timerOn: false })
        }
      }
    }
  }

  handleEdit = () => {
    const { task } = this.props
    if (!task.complete) {
      this.setState({ isEditing: true })
    }
  }

  handleKeyDown = (e) => {
    const { task, editTask } = this.props
    const { editedText } = this.state
    if (e.key === 'Enter') {
      editTask(task.id, editedText)
      this.setState({ isEditing: false })
    } else if (e.key === 'Escape') {
      this.setState({ isEditing: false, editedText: task.description })
    }
  }

  handleChange = (e) => {
    this.setState({ editedText: e.target.value })
  }

  render() {
    const { task, switchComplete, deleteTask, hide } = this.props
    const { isEditing, editedText, timer } = this.state
    return (
      <li className={`${isEditing ? 'editing' : task.complete ? 'completed' : ''} ${hide ? 'todo-hide' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={task.complete} onChange={() => switchComplete(task.id)} />
          <label>
            <span className="title">{task.description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.toggleTimer} />
              <button className="icon icon-pause" onClick={this.toggleTimer} />
              {formatTime(timer)}
            </span>
            <span className="description">created {formatDistanceToNow(new Date(task.created))} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEdit} />
          <button className="icon icon-destroy" onClick={() => deleteTask(task.id)} />
        </div>
        {isEditing && (
          <input
            type="text"
            className="edit"
            value={editedText}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={() => this.setState({ isEditing: false })}
            autoFocus
          />
        )}
      </li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    timeSeconds: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  switchComplete: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}

export default Task
