import { combineReducers } from "redux";
import todos from "../modules/todo/ducks/todo";

export default combineReducers({
  todos,
});
