import { RECEIVE_VOLUNTEER_ERRORS, REMOVE_VOLUNTEER_ERRORS } from "../actions/volunteer_actions";

const _nullErrors = [];

const VolunteerErrorsReducer = (state = _nullErrors, actions) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_VOLUNTEER_ERRORS:
            return action.errors;
        case REMOVE_VOLUNTEER_ERRORS:
            return [];
        default:
            return state;
    }
};

export default VolunteerErrorsReducer;