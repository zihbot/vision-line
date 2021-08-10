import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from '../reducers/root-reducer';
import { getLineNodes } from '../services/data-service';
import { LineAction } from "../reducers/line-reducer";

export function loadLine(lineId: number) {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    getLineNodes(lineId).then(data => {
      dispatch({ type: LineAction.SET_ALL_NODES, payload: data });
      console.log('STATE', getState());
    }).catch(error => {

    });
  }
}