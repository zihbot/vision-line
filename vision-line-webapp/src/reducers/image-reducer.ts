type ImageActionType = 'image/setId';

const image = (state = {}, action: {type: ImageActionType, [key: string]: any}) => {
  switch (action.type) {
    case 'image/setId':
      return Object.assign({}, state, {id: action.id, loading: true});
    default:
      return {};
  }
}

export default image;