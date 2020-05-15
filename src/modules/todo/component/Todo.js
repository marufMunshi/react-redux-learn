/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import {
  addTodo,
  toogleTodoState,
  filterTodos,
  filterTypes,
  getVisibleTodos,
} from "../ducks/todo";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  _handleTextChange = (value) => {
    this.setState({ text: value });
  };

  render() {
    const { text } = this.state;
    const { _addTodo, todos, _toogleTodoState, _filterTodos } = this.props;
    return (
      <section css={todo_css}>
        <div className="input-box">
          <input
            type="text"
            placeholder="type your todos"
            value={text}
            onChange={(e) => this._handleTextChange(e.target.value)}
          />
          <button
            onClick={() => {
              _addTodo(text);
              this._handleTextChange("");
            }}
          >
            Add Todo
          </button>
        </div>
        <ul>
          {todos.map(({ id, text, completed }) => (
            <li
              key={id}
              onClick={() => _toogleTodoState(id)}
              className={completed ? "list-item strike" : "list-item"}
            >
              {text}
            </li>
          ))}
        </ul>
        <div className="todo-filters">
          <span className="todo-filters__text">Show:</span>
          <button onClick={() => _filterTodos(filterTypes.SHOW_ALL)}>
            All
          </button>
          <button onClick={() => _filterTodos(filterTypes.ACTIVE)}>
            Active
          </button>
          <button onClick={() => _filterTodos(filterTypes.COMPLETED)}>
            Completed
          </button>
        </div>
      </section>
    );
  }
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

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos.list, state.todos.visibilityFilter),
});

const mapDispatchToProps = (dispatch) => ({
  _addTodo: (text) => {
    dispatch(addTodo(text));
  },
  _toogleTodoState: (id) => {
    dispatch(toogleTodoState(id));
  },
  _filterTodos: (filterType) => {
    dispatch(filterTodos(filterType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
