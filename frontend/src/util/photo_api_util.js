import axios from 'axios';

// data is FormData
export const uploadPhoto = (data) => {
  return axios.post('/api/images/upload', data)
}

export const getPhotos = () => {
  return axios.get('/api/images')
}

export const getPhoto = (photoId) => {
  return axios.get(`/api/images/${photoId}`)
}

export const deletePhoto = (photoId) => {
  return axios.delete(`/api/images/delete/${photoId}`)
}
