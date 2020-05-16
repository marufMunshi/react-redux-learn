import { combineReducers } from "redux";
import todosReducer from "../modules/todo/ducks/todo";

export default combineReducers({
  todos: todosReducer,
});
