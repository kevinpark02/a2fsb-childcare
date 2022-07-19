import axios from 'axios';

export const getVolunteers = () => {
    return axios.get(`/api/volunteers`);
}

// not sure if this was needed, but can just uncomment if needed
/*
export const getUserVolunteers = id => {
    return axios.get(`/api/volunteers/user/${id}`);
}
*/

export const createVolunteer = data => {
    return axios.post(`/api/volunteers/`, data);
}

export const changeVolunteer = volunteer => {
    return axios.patch(`/api/volunteers/edit/${volunteer._id}`, volunteer);
}

export const deleteVolunteer = volunteerId => {
    return axios.delete(`/api/volunteers/${volunteerId}`);
}