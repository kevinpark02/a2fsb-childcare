import { getVolunteers } from "../util/volunteer_api_util";

export const RECEIVE_VOLUNTEERS = "RECEIVE_VOLUNTEERS";

export const receiveVolunteers = volunteers => ({
    type: RECEIVE_VOLUNTEERS,
    volunteers
});

export const fetchVolunteers = () => dispatch => (
    getVolunteers()
        .then(volunteers => dispatch(receiveVolunteers(volunteers)))
        .catch(err => console.log(err))
);