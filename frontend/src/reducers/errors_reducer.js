import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import ChildErrorsReducer from "./child_errors_reducer";
import EventErrorsReducer from "./event_errors_reducer"''

export default combineReducers({
  session: SessionErrorsReducer,
  child: ChildErrorsReducer,
  event: EventErrorsReducer,
});
