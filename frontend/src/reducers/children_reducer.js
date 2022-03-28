import {
  RECEIVE_CHILDREN,
  RECEIVE_USER_CHILDREN,
  RECEIVE_NEW_CHILD,
} from "../actions/child_actions";

const ChildrenReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_CHILDREN:
            newState.all = action.children.data;
            return newState;
        case RECEIVE_USER_CHILDREN:
            newState.user = action.children.data;
            return newState;
        case RECEIVE_NEW_CHILD:
            newState.new = action.child.data
            return newState;
        default:
            return state;
    }
};

export default ChildrenReducer;