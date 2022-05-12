import { RECEIVE_EVENTS, RECEIVE_EVENT, CLEAR_EVENT } from "../actions/event_actions";

const EventsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_EVENTS:
            let i;
            for (i = 0; i < action.events.data.length; i++) {
                newState[action.events.data[i]._id] = action.events.data[i];
            }
            return newState;
        case RECEIVE_EVENT:
            return Object.assign(newState, { [action.event.data._id]: action.event.data });
        case CLEAR_EVENT:
            delete newState[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default EventsReducer;