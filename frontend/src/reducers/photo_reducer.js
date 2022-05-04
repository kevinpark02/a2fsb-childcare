import {RECEIVE_PHOTOS, RECEIVE_PHOTO, DELETE_PHOTO} from '../actions/photo_actions';

const photosReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let nextState = Object.assign({}, oldState)
  switch(action.type) {
    case RECEIVE_PHOTOS:
      let i;
      for(i = 0; i < action.photos.data.length; i++) {
        nextState[action.photos.data[i]._id] = action.photos.data[i]
      }
      return nextState; 
    case RECEIVE_PHOTO: 
      return Object.assign({}, oldState, {[action.photo.data._id]: action.photo.data})
    case DELETE_PHOTO:
      delete nextState[action.photoId]
      return nextState;
    default:
      return oldState;
  }
}

export default photosReducer;



