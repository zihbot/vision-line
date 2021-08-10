const line = (state: LineState = {}, action: {type: string, [key: string]: any}) => {
  switch (action.type) {
    case LineAction.SET_ALL_NODES:
      return {...state, nodes: action.payload, loading: false};
    default:
      return state;
  }
}

export default line;

export type LineState = {
  loading?: boolean,
  nodes?: any,
}

export const LineAction = {
  SET_ALL_NODES: 'line/setAllNodes'
}