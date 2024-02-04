import React from "react";
import "./taskList.scss";
import Task from "../task";

const TaskList = ({ tasks, switchComplete, deleteTask, filter }) => {
  return (
    <ul class="todo-list">
      {tasks
        .filter((task) => {
          return (
            filter === "all" ||
            (filter === "active" && !task.complete) ||
            (filter === "completed" && task.complete)
          );
        })
        .map((task) => (
          <Task
            deleteTask={deleteTask}
            key={task.id}
            switchComplete={switchComplete}
            id={task.id}
            description={task.description}
            created={task.created}
            mode={task.complete ? "completed" : "view"}
          />
        ))}
    </ul>
  );
};

export default TaskList;
