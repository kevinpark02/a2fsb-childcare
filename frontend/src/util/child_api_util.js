import axios from 'axios';

export const getChildren = () => {
    return axios.get(`/api/children`);
}

export const getUserChildren = id => {
    return axios.get(`/api/children/user/${id}`);
}

export const createChild = data => {
    return axios.post('/api/children/', data);
}

export const changeChild = childId => {
    return axios.put(`/api/children/${childId}`)
}

export const deleteChild = (childId) => {
    return axios.delete(`/api/children/${childId}`)
}