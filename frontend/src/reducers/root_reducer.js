import { combineReducers } from "redux";
import session from "./session_reducer";
import error from "./errors_reducer";
import children from "./children_reducer";
import volunteers from "./volunteers_reducer";
import ui from "./ui_reducer";
import photoReducer from "./photo_reducer"

const RootReducer = combineReducers({
  session,
  error,
  children,
  volunteers,
  ui,
  photos: photoReducer
});

export default RootReducer;
