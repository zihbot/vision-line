import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from '../reducers/root-reducer';
import { LineAction } from "../reducers/line-reducer";
import api from '../services/data-service';

export function loadLine(lineId: number) {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    api().linesLineIdNodesGet({lineId}).subscribe({next: data => {
      const payload: any = {};
      data.forEach(node => payload[node.id??0] = node);
      dispatch({ type: LineAction.SET_ALL_NODES, payload: payload });
    }, error: error => {
      console.log('ERROR', error);
    }});
  }
}