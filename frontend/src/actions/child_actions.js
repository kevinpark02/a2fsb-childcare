import { getChildren, getUserChildren, createChild, deleteChild } from "../util/child_api_util";

export const RECEIVE_CHILDREN = "RECEIVE_CHILDREN";
export const RECEIVE_USER_CHILDREN = "RECEIVE_USER_CHILDREN";
export const RECEIVE_NEW_CHILD = "RECEIVE_NEW_CHILD";
export const CLEAR_CHILD = "CLEAR_CHILD"

export const receiveChildren = children => ({
    type: RECEIVE_CHILDREN,
    children
});

export const receiveUserChildren = children => ({
    type: RECEIVE_USER_CHILDREN,
    children
});

export const receiveNewChild = child => ({
    type: RECEIVE_NEW_CHILD,
    child
});

export const clearChild = child => ({
    type: CLEAR_CHILD,
    child
})

export const fetchChildren = () => dispatch => (
    getChildren()
        .then(children => dispatch(receiveChildren(children)))
        .catch(err => console.log(err))
);

export const fetchUserChildren = id => dispatch => (
    getUserChildren(id)
        .then(children => dispatch(receiveUserChildren(children)))
        .catch(err => console.log(err))
);

export const makeChild = data => dispatch => (
    createChild(data)
        .then(child => dispatch(receiveNewChild(child)))
        .catch(err => console.log(err))
);

export const removeChild = childId => dispatch => (
    deleteChild(childId)
        .then(child => dispatch(clearChild(child)))
)