import { RECEIVE_VOLUNTEERS } from "../actions/volunteer_actions";

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
        default:
            return state;
    }
};

export default VolunteersReducer;
