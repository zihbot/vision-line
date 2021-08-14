import { useDispatch, useSelector } from "react-redux";
import { loadLine } from "../actions/line-actions";
import { RootState } from '../reducers/root-reducer';

export const Loader = () => {
  const nodesState = useSelector((state: RootState) => state.line.nodes);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('CLICK');
    dispatch(loadLine(0));    
  }

  return <p onClick={handleClick}> { JSON.stringify(nodesState ?? {}) } </p>
}