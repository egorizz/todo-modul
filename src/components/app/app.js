import React, { useState } from 'react'

import './app.scss'
import TaskList from '../taskList'
import Footer from '../footer'
import NewTodo from '../new-todo'
import AppHeader from '../app-header'

const HtmlTodo = () => {
  const [filter, setFilter] = useState('all')

  const [tasks, setTasks] = useState([])

  const switchComplete = (id) => {
    setTasks((oldTasks) => {
      const newTasks = [...oldTasks]
      const task = newTasks.find((task) => task.id === id)
      task.complete = !task.complete
      return newTasks
    })
  }

  const deleteTask = (id) => {
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id))
  }

  const editTask = (id, newDescription) => {
    setTasks((oldTasks) => {
      const newTasks = oldTasks.map((task) => {
        if (task.id === id) {
          return { ...task, description: newDescription }
        }
        return task
      })
      return newTasks
    })
  }

  // Внутри HtmlTodo

  const addItem = (text, timeSeconds) => {
    const lastId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0
    const newItem = {
      id: lastId + 1,
      description: text,
      complete: false,
      created: new Date(),
      timeSeconds, // добавляем это новое свойство
    }
    setTasks((oldTasks) => [...oldTasks, newItem])
  }

  const clearCompleted = () => {
    setTasks((oldTasks) => oldTasks.filter((task) => !task.complete))
  }

  const doneCount = tasks.filter((el) => el.complete).length
  const todoCount = tasks.length - doneCount

  return (
    <section className="todoapp">
      <header className="header">
        <AppHeader />
        <NewTodo onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          switchComplete={switchComplete}
          deleteTask={deleteTask}
          editTask={editTask}
          filter={filter}
        />
        <Footer numActive={todoCount} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default HtmlTodo
