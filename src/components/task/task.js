import React, { useState, useEffect } from 'react'
import './task.scss'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = ({ task, switchComplete, deleteTask, editTask, hide = false }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.description)
  // Внимание, используем task.timeSeconds для инициализации таймера
  const [timer, setTimer] = useState(task.timeSeconds || 720) // Устанавливаем значение по умолчанию на 720, если timeSeconds отсутствует

  const [timerOn, setTimerOn] = useState(false)

  useEffect(() => {
    let interval = null

    if (timerOn && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1)
      }, 1000)
    } else if (!timerOn || timer <= 0) {
      clearInterval(interval)
      if (timer <= 0) {
        setTimerOn(false) // Automatically stop the timer when it reaches 0
      }
    }

    return () => clearInterval(interval)
  }, [timerOn, timer])

  const toggleTimer = () => {
    // Проверяем, завершена ли задача; если нет, переключаем таймер
    if (task.complete) {
      return
    }
    setTimerOn(!timerOn)
  }

  useEffect(() => {
    // Обнуление таймера для завершённых задач
    if (task.complete) {
      setTimerOn(false)
      setTimer(0)
    }
  }, [task.complete])

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return ` ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  return (
    <li className={`${isEditing ? 'editing' : task.complete ? 'completed' : ''} ${hide ? 'todo-hide' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.complete} onChange={() => switchComplete(task.id)} />
        <label>
          <span className="title">{task.description}</span>
          <span className="description">
            <button className="icon icon-play" onClick={toggleTimer}></button>
            <button className="icon icon-pause" onClick={toggleTimer}></button>
            {formatTime(timer)}
          </span>
          <span className="description">created {formatDistanceToNow(new Date(task.created))} ago</span>
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
