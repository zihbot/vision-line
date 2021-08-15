import { ImageAction } from '../reducers/image-reducer';
import { Action } from '../types/action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers/root-reducer';
import { AnyAction } from 'redux';
import api from '../services/data-service';

export function setActiveImage(id: number): Action {
  return {
    type: ImageAction.SET_ACTIVE_ID,
    payload: id,
  }
}

export function imageModified(): Action {
  return {
    type: ImageAction.MODIFIED,
    payload: new Date().getTime(),
  }
}

export function createNewImage(name: string) {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => {
    api().linesPost({line: {name: name}}).subscribe({next: data => {
      dispatch({ type: ImageAction.SET_ACTIVE_ID, payload: data.id });
      dispatch(imageModified());
    }, error: error => {
      console.log('ERROR', error);
    }});
  }
}