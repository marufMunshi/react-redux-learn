/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  addFilterType,
  filterTypes,
  getVisibleTodos,
} from "../ducks/todo";

function Todo() {
  const dispatch = useDispatch();
  const { list, visibilityFilter } = useSelector((state) => state.todos);

  const [text, setText] = useState("");
  const todos = getVisibleTodos(list, visibilityFilter);

  const _handleTextChange = (value) => {
    setText(value);
  };
  const _addTodo = () => {
    dispatch(addTodo(text));
    _handleTextChange("");
  };

  return (
    <section css={todo_css}>
      <div className="input-box">
        <input
          type="text"
          placeholder="type your todos"
          value={text}
          onChange={(e) => _handleTextChange(e.target.value)}
        />
        <button onClick={() => _addTodo()}>Add Todo</button>
      </div>
      <ul>
        {todos.map(({ id, text, completed }) => (
          <li
            key={id}
            onClick={() => dispatch(toggleTodo(id))}
            className={completed ? "list-item strike" : "list-item"}
          >
            {text}
          </li>
        ))}
      </ul>
      <div className="todo-filters">
        <span className="todo-filters__text">Show:</span>
        <button onClick={() => dispatch(addFilterType(filterTypes.SHOW_ALL))}>
          All
        </button>
        <button onClick={() => dispatch(addFilterType(filterTypes.ACTIVE))}>
          Active
        </button>
        <button onClick={() => dispatch(addFilterType(filterTypes.COMPLETED))}>
          Completed
        </button>
      </div>
    </section>
  );
}

const todo_css = css`
  button,
  span {
    font-size: 16px;
    color: #333;
  }
  button {
    padding: 8px 20px;
  }
  .input-box {
    margin-bottom: 15px;
    input {
      padding: 8px 10px;
      font-size: 16px;
      color: #333;
    }
  }
  .todo-filters {
    .todo-filters__text {
      margin-right: 15px;
      font-size: 20px;
    }
  }
  .list-item {
    cursor: pointer;
  }
  .strike {
    text-decoration: line-through;
  }
`;

export default Todo;
