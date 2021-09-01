import { Action } from '../types/action';

const image = (state: ImageState = {}, action: Action) => {
  switch (action.type) {
    case ImageAction.SET_ID:
      return {...state, id: action.id, loading: true};
    case ImageAction.SET_ACTIVE_ID:
      return {...state, activeId: action.payload};
    case ImageAction.SHOW_NODE:
      return {...state, shownNodeId: action.payload};
    case ImageAction.MODIFIED:
      return {...state, modified: action.payload, shownNodeId: undefined};
    default:
      return state;
  }
}

export default image;

export type ImageState = {
  id?: number,
  activeId?: number,
  shownNodeId?: number,
  modified?: number,
}

export const ImageAction = {
  SET_ID: 'image/setId',
  SET_ACTIVE_ID: 'image/setActiveId',
  SHOW_NODE: 'image/setActiveNode',
  MODIFIED: 'image/modified',
}