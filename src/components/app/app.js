import React from "react";

import "./app.scss";
import TaskList from "../taskList";
import Footer from "../footer";
import NewTodo from "../new-todo";
import AppHeader from "../app-header";

const HtmlTodo = () => {
  return (
    <section className="todoapp">
      <header class="header">
        <AppHeader />
        <NewTodo />
      </header>
      <section class="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};

export default HtmlTodo