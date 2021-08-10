import { combineReducers } from 'redux'
import image, { ImageState } from './image-reducer';
import line, { LineState } from './line-reducer';

export default combineReducers({
  image,
  line
})

export type RootState = {
  image: ImageState,
  line: LineState,
}