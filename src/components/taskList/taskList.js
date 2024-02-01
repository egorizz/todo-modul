import React from "react";
import "./taskList.scss";
import Task from "../task";

const TaskList = () => {
  return (
    <ul class="todo-list">
      <Task description={'Completed task'} created={new Date('2024-01-25')} mode="complete" />
      <Task description={'Editing task'} created={new Date('2024-01-25')} mode="edit" />
      <Task description={'Active task'} created={new Date('2023-08-05')} mode="view" />
    </ul>
  );
};

export default TaskList
