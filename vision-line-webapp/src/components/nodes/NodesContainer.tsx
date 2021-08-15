import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/root-reducer';
import { useEffect } from 'react';
import { loadLine } from '../../actions/line-actions';
import { Typography, List } from '@material-ui/core';
import { NodeItem } from './NodeItem';
import { NewNode } from './NewNode';
export function NodesContainer() {
  const activeImage = useSelector((state: RootState) => state.image.activeId);
  const nodes = useSelector((state: RootState) => state.line.nodes ?? {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof activeImage !== 'undefined') {
      dispatch(loadLine(activeImage));
    }
  }, [activeImage, dispatch]);

  return (
    <>
      <div style={{display: 'flex'}}>
        <Typography variant="h4">Módosítók</Typography>
        <NewNode style={{marginLeft: 'auto'}}/>
      </div>
      <List>
        {Object.entries(nodes).map(([nodeId, node]) => (
          <NodeItem key={nodeId} node={node} />
        ))}
      </List>
    </>
  );
}