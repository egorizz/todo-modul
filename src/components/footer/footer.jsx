import React, { Component } from 'react'
import './footer.scss'
import PropTypes from 'prop-types'

class Footer extends Component {
  render() {
    const { numActive, filter, setFilter, clearCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{numActive} items left</span>
        <ul className="filters">
          <li>
            <button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>
              All
            </button>
          </li>
          <li>
            <button className={filter === 'active' ? 'selected' : ''} onClick={() => setFilter('active')}>
              Active
            </button>
          </li>
          <li>
            <button className={filter === 'completed' ? 'selected' : ''} onClick={() => setFilter('completed')}>
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  numActive: PropTypes.number,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  numActive: 0,
}

export default Footer
