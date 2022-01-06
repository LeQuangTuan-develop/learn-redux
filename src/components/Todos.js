import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosSelector } from "../store/reducers/todosSlide";
import {
  markCompleted,
  deleteTodo,
  getTodos,
} from "../store/reducers/todosSlide";
import TodoForm from "./TodoForm";

const Todos = () => {
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed ? true : false}
              onChange={() => dispatch(markCompleted(todo.id))}
            />
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
