import { combineReducers } from 'redux'
import image from './image-reducer';
import { ImageState } from './image-reducer';

export default combineReducers({
  image
})

export type RootState = {
  image: ImageState
}