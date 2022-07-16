import { getEvents, getEvent, createEvent, changeEvent, deleteEvent } from "../util/event_api_util";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
// export const RECEIVE_NEW_EVENT = "RECEIVE_NEW_EVENT";
// export const EDIT_EVENT = "EDIT_EVENT";
export const CLEAR_EVENT = "CLEAR_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const REMOVE_EVENT_ERORRS = "REMOVE_EVENT_ERORRS";

export const receiveEvents = (events) => ({
    type: RECEIVE_EVENTS,
    events
});

export const receiveEvent = (event) => ({
    type: RECEIVE_EVENT,
    event
});

// export const receiveNewEvent = event => ({
//     type: RECEIVE_NEW_EVENT,
//     event
// });

// export const alterEvent = event => ({
//     type: EDIT_EVENT,
//     event
// });

export const clearEvent = eventId => ({
    type: CLEAR_EVENT,
    eventId
});

export const receiveErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
});

export const removeEventErrors = () => ({
    type: REMOVE_EVENT_ERORRS
});

export const fetchEvents = () => dispatch => (
    getEvents()
        .then(events => dispatch(receiveEvents(events)))
        .catch(err => console.log(err))
);

export const fetchEvent =(eventId) => dispatch => (
    getEvent(eventId)
        .then(event => dispatch(receiveEvent(event)))
        .catch(err => console.log(err))
);

export const makeEvent = (data) => dispatch => (
    createEvent(data)
        .then(event => dispatch(receiveEvent(event)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const removeEvent = (eventId) => dispatch => (
    deleteEvent(eventId)
        .then(() => dispatch(clearEvent(eventId)))
        .catch(err => console.log(err))
);

export const editEvent = event => dispatch => (
    changeEvent(event)
        .then(() => dispatch(receiveEvent(event)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);
