import {
  RECEIVE_CHILD_ERRORS, REMOVE_CHILD_ERRORS,
} from "../actions/child_actions";

const _nullErrors = [];

const ChildErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHILD_ERRORS:
      return action.errors;
    case REMOVE_CHILD_ERRORS:
      return [];
    default:
      return state;
  }
};

export default ChildErrorsReducer;
