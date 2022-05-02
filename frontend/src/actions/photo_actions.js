import * as PhotoAPIUtil from '../util/photo_api_util';

export const RECEIVE_PHOTOS = "RECEIVE_PHOTOS"
export const RECEIVE_PHOTO = "RECEIVE_PHOTO"
export const DELETE_PHOTO = "DELETE_PHOTO"

export const receivePhotos = photos => {
  return ({
    type: RECEIVE_PHOTOS,
    photos 
  })
};

export const receivePhoto = photo => {
  return ({
    type: RECEIVE_PHOTO,
    photo
  })
}

export const removePhoto = (photoId) => {
  return ({
    type: DELETE_PHOTO,
    photoId
  })
}

export const fetchPhotos = () => dispatch => {
  return (
    PhotoAPIUtil.getPhotos()
      .then(photos => dispatch(receivePhotos(photos)))
      .catch(err => console.log(err))
  )
}

export const fetchPhoto = (photoId) => dispatch => {
  return PhotoAPIUtil.getPhoto(photoId)
    .then((photo) => dispatch(receivePhoto(photo)))
    .catch((err) => console.log(err));
}

export const deletePhoto = (photoId) => dispatch => {
  return PhotoAPIUtil.deletePhoto(photoId)
    .then(() => dispatch(removePhoto(photoId)))
    .catch((err) => console.log(err));
}


