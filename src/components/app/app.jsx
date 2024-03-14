import React, { Component } from 'react'

import './app.scss'
import TaskList from '../taskList'
import Footer from '../footer'
import NewTodo from '../new-todo'
import AppHeader from '../app-header'

class HtmlTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'all',
      tasks: [],
    }
  }

  switchComplete = (id) => {
    this.setState((prevState) => {
      const newTasks = [...prevState.tasks]
      const taskIndex = newTasks.findIndex((task) => task.id === id)
      newTasks[taskIndex].complete = !newTasks[taskIndex].complete
      return { tasks: newTasks }
    })
  }

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }))
  }

  editTask = (id, newDescription) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, description: newDescription } : task)),
    }))
  }

  addItem = (text, timeSeconds) => {
    const lastId = this.state.tasks.length > 0 ? Math.max(...this.state.tasks.map((task) => task.id)) : 0
    const newItem = {
      id: lastId + 1,
      description: text,
      complete: false,
      created: new Date(),
      timeSeconds,
    }
    this.setState((prevState) => ({ tasks: [...prevState.tasks, newItem] }))
  }

  clearCompleted = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.complete),
    }))
  }

  render() {
    const { filter, tasks } = this.state
    const doneCount = tasks.filter((el) => el.complete).length
    const todoCount = tasks.length - doneCount

    return (
      <section className="todoapp">
        <header className="header">
          <AppHeader />
          <NewTodo onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            switchComplete={this.switchComplete}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            filter={filter}
          />
          <Footer
            numActive={todoCount}
            filter={filter}
            setFilter={(filter) => this.setState({ filter })}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

export default HtmlTodo
