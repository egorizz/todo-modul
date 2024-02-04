import "./task.scss";
import { formatDistanceToNow } from "date-fns";

const Task = ({ description, created, id, switchComplete, deleteTask, mode = "view" }) => {
  if (mode == "view") {
    return (
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" onClick={() => switchComplete(id)} />
          <label>
            <span class="description">{description}</span>
            <span class="created">
              created {formatDistanceToNow(created)} ago
            </span>
          </label>
          <button class="icon icon-edit"></button>
          <button class="icon icon-destroy" onClick={() => deleteTask(id) }></button>
        </div>
      </li>
    );
  } else if (mode == "edit") {
    return (
      <li class="editing">
        <div class="view">
          <input class="toggle" type="checkbox" onClick={() => switchComplete(id)} />
          <label>
            <span class="description">{description}</span>
            <span class="created">
              created {formatDistanceToNow(created)} ago
            </span>
          </label>
          <button class="icon icon-edit"></button>
          <button class="icon icon-destroy" onClick={() => deleteTask(id) }></button>
        </div>
        <input type="text" class="edit" value="Editing task" />
      </li>
    );
  }
  return (
    <li class="completed">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          checked
          onClick={() => switchComplete(id)}
        />
        <label>
          <span class="description">{description}</span>
          <span class="created">
            created {formatDistanceToNow(created)} ago
          </span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy" onClick={() => deleteTask(id) }></button>
      </div>
    </li>
  );
};

export default Task;
