import axios from 'axios';

export const getEvents = () => {
    return axios.get(`/api/events`);
}

export const getEvent = eventId => {
    return axios.get(`/api/events/${eventId}`);
}

export const createEvent = data => {
    return axios.post(`/api/events/`, data);
}

export const changeEvent = event => {
    return axios.patch(`/pai/events/edit/${event._id}`, event);
}

export const deleteEvent = eventId => {
    return axios.delete(`/api/events/${eventId}`);
}
