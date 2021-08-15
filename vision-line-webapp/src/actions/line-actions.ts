import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from '../reducers/root-reducer';
import { LineAction } from "../reducers/line-reducer";
import api from '../services/data-service';
import { Node } from "../api";
import { imageModified } from './image-actions';

function setNodes(dispatch: ThunkDispatch<RootState, undefined, AnyAction>, data: Node[]) {
  const payload: any = {};
  data.forEach(node => payload[node.id??0] = node);
  dispatch({ type: LineAction.SET_ALL_NODES, payload: payload });  
  dispatch(imageModified());
}

export function loadLine(lineId: number) {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    api().linesLineIdNodesGet({lineId}).subscribe({next: data => {
      setNodes(dispatch, data);
    }, error: error => {
      console.log('ERROR', error);
    }});
  }
}

export function createNodeOnLine(lineId: number, node: Node) {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    api().linesLineIdNodesPost({lineId, node}).subscribe({next: data => {
      setNodes(dispatch, data);
    }, error: error => {
      console.log('ERROR', error);
    }});
  }
}

export function deleteNodeOnLine(lineId: number, nodeId: number) {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    api().linesLineIdNodesNodeIdDelete({lineId, nodeId}).subscribe({next: data => {
      setNodes(dispatch, data);
    }, error: error => {
      console.log('ERROR', error);
    }});
  }
}