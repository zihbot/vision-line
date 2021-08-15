import { Action } from '../types/action';

const image = (state: ImageState = {}, action: Action) => {
  switch (action.type) {
    case ImageAction.SET_ID:
      return {...state, id: action.id, loading: true};
    case ImageAction.SET_ACTIVE_ID:
      return {...state, activeId: action.payload};
    case ImageAction.MODIFIED:
      return {...state, modified: action.payload};
    default:
      return state;
  }
}

export default image;

export type ImageState = {
  id?: number,
  activeId?: number,
  modified?: number,
}

export const ImageAction = {
  SET_ID: 'image/setId',
  SET_ACTIVE_ID: 'image/setActiveId',
  MODIFIED: 'image/modified',
}