import React from "react";
import "./footer.scss";

const Footer = ({ toDo, filter, setFilter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <ul className="filters">
        <li>
          <button
            className={filter == "all" ? "selected" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter == "active" ? "selected" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter == "completed" ? "selected" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
    </footer>
  );
};

export default Footer;
