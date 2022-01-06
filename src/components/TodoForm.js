import React, { useState } from "react";
// import { v4 as uuidv4 } from 'uuid'
import { addTodo } from "../store/reducers/todosSlide";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (title !== "") {
      dispatch(addTodo(title));
      setTitle("");
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="title"
          onChange={onTitleChange}
          value={title}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
