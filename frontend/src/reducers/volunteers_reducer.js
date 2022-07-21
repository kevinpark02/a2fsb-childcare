import { RECEIVE_VOLUNTEERS, RECEIVE_NEW_VOLUNTEER, EDIT_VOLUNTEER, CLEAR_VOLUNTEER } from "../actions/volunteer_actions";

const VolunteersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_VOLUNTEERS:
            let i;
            for (i = 0; i < action.volunteers.data.length; i++) {
                newState[action.volunteers.data[i]._id] = action.volunteers.data[i];
            }
            return newState;
        case RECEIVE_NEW_VOLUNTEER:
            // children reducer had a new in state, volunteers does not
            // currently unsure of what needs to be done, but need to create 
            // if I am guessing correctly, then the key for the new is volunteers.data.length
            // not too sure about the ._id part though
            let j = action.volunteers.data.length;
            newState[action.volunteers.data[j]._id] = action.volunteers.data[j];
            return newState;
        case EDIT_VOLUNTEER: 
            let k;
            // for now, just having it do same as recieve volunteers
            // will need to find a way to possibly get id of volunteer being edited
            // to change only that one person instead of reloading all
            for (k = 0; k < action.volunteers.data.length; k++) {
                newState[action.volunteers.data[k]._id] = action.volunteers.data[k];
            }
            return newState;
        case CLEAR_VOLUNTEER:
            // not sure if I can just copy this from children reducer
            // not sure how this one works
            return state.filter(user => user !== action.userIdToDelete);
        default:
            return state;
    }
};

export default VolunteersReducer;
