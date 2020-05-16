import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

export const filterTypes = {
  SHOW_ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const INITIAL_STATE = {
  visibilityFilter: filterTypes.SHOW_ALL,
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState: INITIAL_STATE,
  reducers: {
    addTodo(state, action) {
      state.list.push({
        id: uuidv4(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action) {
      state.list = state.list.map((t) => ({
        ...t,
        completed: t.id === action.payload ? !t.completed : t.completed,
      }));
    },
    addFilterType(state, action) {
      state.visibilityFilter = action.payload;
    },
  },
});

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

export const { addTodo, toggleTodo, addFilterType } = todosSlice.actions;

export default todosSlice.reducer;
