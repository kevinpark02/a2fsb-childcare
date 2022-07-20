import { getVolunteers, createVolunteer, changeVolunteer, deleteVolunteer } from "../util/volunteer_api_util";
import { receiveErrors } from "./child_actions";

export const RECEIVE_VOLUNTEERS = "RECEIVE_VOLUNTEERS";
export const RECEIVE_NEW_VOLUNTEER = "RECEIVE_NEW_VOLUNTEER";
export const CLEAR_VOLUNTEER = "CLEAR_VOLUNTEER";
export const EDIT_VOLUNTEER = "EDIT_VOLUNTEER";
export const RECEIVE_VOLUNTEER_ERRORS = "RECEIVE_VOLUNTEER_ERRORS";
export const REMOVE_VOLUNTEER_ERRORS = "REMOVE_VOLUNTEER_ERRORS";

export const receiveVolunteers = volunteers => ({
    type: RECEIVE_VOLUNTEERS,
    volunteers
});

export const recieveNewVolunteer = volunteer => ({
    type: RECEIVE_NEW_VOLUNTEER,
    volunteer
});

export const alterVolunteer = volunteer => ({
    type: EDIT_VOLUNTEER,
    volunteer
});

export const clearVolunteer = volunteerId =>({
    type: CLEAR_VOLUNTEER,
    volunteerId
});

export const removeVolunteerErrors = () => ({
    type: REMOVE_VOLUNTEER_ERRORS
});

export const fetchVolunteers = () => dispatch => (
    getVolunteers()
        .then(volunteers => dispatch(receiveVolunteers(volunteers)))
        .catch(err => console.log(err))
);

export const makeVolunteer = data => dispatch => (
    createVolunteer(data)
        .then(volunteer => dispatch(recieveNewVolunteer(volunteer)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const removeVolunteer = volunteerId => dispatch => (
    deleteVolunteer(volunteerId)
        .then(() => dispatch(clearChild(childId)))
        .catch(err => console.log(err))
);

export const editVolunteer = volunteer => dispatch => (
    changeVolunteer(volunteer)
        .then(() => dispatch(alterVolunteer(volunteer)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);