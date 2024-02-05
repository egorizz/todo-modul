import './task.scss'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = ({ task, switchComplete, deleteTask, mode }) => {
  if (mode === 'view') {
    return (
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={() => switchComplete(task.id)} />
          <label>
            <span className="description">{task.description}</span>
            <span className="created">created {formatDistanceToNow(task.created)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
        </div>
      </li>
    )
  } else if (mode === 'edit') {
    return (
      <li className="editing">
        <div className="view">
          <input className="toggle" type="checkbox" onClick={() => switchComplete(task.id)} />
          <label>
            <span className="description">{task.description}</span>
            <span className="created">created {formatDistanceToNow(task.created)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
        </div>
        <input type="text" className="edit" value="Editing task" />
      </li>
    )
  }
  return (
    <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked onClick={() => switchComplete(task.id)} />
        <label>
          <span className="description">{task.description}</span>
          <span className="created">created {formatDistanceToNow(task.created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
      </div>
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
  mode: PropTypes.oneOf(['view', 'edit', 'completed']),
}

Task.defaultProps = {
  mode: 'view',
}

export default Task
