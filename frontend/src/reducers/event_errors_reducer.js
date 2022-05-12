import {
    RECEIVE_EVENT_ERRORS, REMOVE_EVENT_ERORRS
} from "../actions/event_actions";

const _nullErrors = [];

const EventErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_EVENT_ERRORS:
            return action.errors;
        case REMOVE_EVENT_ERORRS:
            return [];
        default:
            return state;
    }
};

export default EventErrorsReducer;