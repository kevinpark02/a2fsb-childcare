import { combineReducers } from "redux";
import session from "./session_reducer";
import error from "./errors_reducer";
import children from "./children_reducer";
import ui from "./ui_reducer";

const RootReducer = combineReducers({
  session,
  error,
  children,
  ui,
});

export default RootReducer;
