import { v4 as uuidv4 } from "uuid";

export const ADD = "ADD";
export const TOGGLE = "TOGGLE";
export const filterTypes = {
  SHOW_ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const INITIAL_STATE = {
  visibilityFilter: filterTypes.SHOW_ALL,
  list: [],
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: uuidv4(),
            text: action.text,
            completed: false,
          },
        ],
      };
    }
    case TOGGLE: {
      return {
        ...state,
        list: state.list.map((t) => ({
          ...t,
          completed: t.id === action.id ? !t.completed : t.completed,
        })),
      };
    }
    case filterTypes.SHOW_ALL:
    case filterTypes.ACTIVE:
    case filterTypes.COMPLETED: {
      return {
        ...state,
        visibilityFilter: action.type,
      };
    }
    default:
      return state;
  }
};

export const addTodo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const filterTodos = (filterType) => ({ type: filterType });

export const toogleTodoState = (id) => ({ type: TOGGLE, id });

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case filterTypes.SHOW_ALL:
      return todos;
    case filterTypes.COMPLETED:
      return todos.filter((t) => t.completed);
    case filterTypes.ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      return todos;
  }
};

export default todoReducer;
