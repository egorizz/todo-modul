import React, { useState } from "react";
import "./new-todo.scss";

// const NewTodo = () => {
//   state = {
//     label: "",
//   };

//   onLabelChange = (e) => {
//     this.useState({ label: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     this.props.onItemAdded(this.state.label);
//     this.useState({ label: "" });
//   };

//   return (
//     <input
//       type="text"
//       className="new-todo"
//       onSubmit={this.onSubmit}
//       onChange={this.onLabelChange}
//       placeholder="What needs to be done?"
//       value={this.state.label}
//       autofocus
//     />
//   );
// };

const NewTodo = (props) => {
  const [label, setLabel] = useState("");

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label.trim() !== "") {
      props.onItemAdded(label);
      setLabel("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
        autoFocus
      />
    </form>
  );
};

export default NewTodo;
