import axios from 'axios';

export const getVolunteers = () => {
    return axios.get(`/api/volunteers`);
}

