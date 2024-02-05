import React, { useState } from 'react'

import './app.scss'
import TaskList from '../taskList'
import Footer from '../footer'
import NewTodo from '../new-todo'
import AppHeader from '../app-header'

const HtmlTodo = () => {
  const [filter, setFilter] = useState('all')

  const [tasks, setTasks] = useState([
    {
      description: 'Completed task',
      complete: true,
      created: new Date('2024-01-25'),
      id: 1,
    },
    {
      description: 'Editing task',
      complete: false,
      created: new Date('2024-01-25'),
      id: 2,
    },
    {
      description: 'Active task',
      complete: true,
      created: new Date('2024-01-25'),
      id: 3,
    },
  ])

  const switchComplete = (id) => {
    setTasks((oldTasks) => {
      const newTasks = [...oldTasks]
      const task = newTasks.find((task) => task.id === id)
      task.complete = !task.complete
      return newTasks
    })
  }

  const deleteTask = (id) => {
    setTasks((oldTasks) => {
      const newTasks = oldTasks.filter((task) => task.id !== id)
      return newTasks
    })
  }

  const addItem = (text) => {
    const lastId = Math.max(...tasks.map((task) => task.id))
    const newItem = { id: lastId + 1, description: text, complete: false, created: new Date() }
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
        <TaskList tasks={tasks} switchComplete={switchComplete} deleteTask={deleteTask} filter={filter} />
        <Footer
          numActive={todoCount}
          done={doneCount}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

export default HtmlTodo
