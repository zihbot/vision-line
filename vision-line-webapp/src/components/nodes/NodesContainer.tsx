import { useSelector, useDispatch } from 'react-redux';
import { List } from '@material-ui/core';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { RootState } from '../../reducers/root-reducer';
import { loadLine, moveNodeInList } from '../../actions/line-actions';
import { NodeItem } from './NodeItem';
import { ContainerHeader } from './ContainerHeader';

export function NodesContainer() {
  const activeImage = useSelector((state: RootState) => state.image.activeId);
  const nodes = useSelector((state: RootState) => state.line.nodes ?? {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof activeImage !== 'undefined') {
      dispatch(loadLine(activeImage));
    }
  }, [activeImage, dispatch]);

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    if (!result.destination || result.destination.index === result.source.index) return;

    dispatch(moveNodeInList(activeImage??0, nodes[result.source.index].id??0, result.destination.index));
  }

  const show = typeof activeImage !== 'undefined';
  return (
    <>
      {show &&
      <>
        <ContainerHeader />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
          {provided => (
            <List ref={provided.innerRef}>
            {Object.entries(nodes).map(([pos, node]) => (
              <NodeItem key={pos} node={node} />
            ))}
              {provided.placeholder}
            </List>
          )}
          </Droppable>
        </DragDropContext>
      </>}
    </>
  );
}