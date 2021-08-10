const image = (state: ImageState = {}, action: {type: string, [key: string]: any}) => {
  switch (action.type) {
    case ImageAction.SET_ID:
      return {...state, id: action.id, loading: true};
    default:
      return state;
  }
}

export default image;

export type ImageState = {
  id?: number
}

export const ImageAction = {
  SET_ID: 'image/setId'
}