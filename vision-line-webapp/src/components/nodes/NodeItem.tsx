import { IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { Node } from "../../api";
import { deleteNodeOnLine } from '../../actions/line-actions';
import { showNode } from '../../actions/image-actions';
import { RootState } from '../../reducers/root-reducer';
import { EditNodeDialog } from './EditNodeDialog';

export function NodeItem(props: {node: Node}) {
  const dispatch = useDispatch();
  const lineId = useSelector((state: RootState) => state.image.activeId);
  const shownNodeId = useSelector((state: RootState) => state.image.shownNodeId);

  function deleteItem() {
    dispatch(deleteNodeOnLine(lineId??0, props.node.id??0));
  }

  function showHideItem() {
    const idToShow = shownNodeId === props.node.id ? undefined : props.node.id;
    dispatch(showNode(idToShow));
  }

  const inputs = Object.entries(props.node.inputs ?? {}).map(([key, value]: [string, string]) => {
    const trunkValue = value.length > 30 ? value.substring(0, 27) + '...' : value;
    return <Typography key={key} variant="body1">{key}: <b>{trunkValue}</b></Typography>
  });

  return (
    <Draggable draggableId={''+props.node.position} index={props.node.position??0}>
      {provided => (
        <ListItem button ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <ListItemText primary={props.node.name} secondary={inputs} secondaryTypographyProps={{component: 'div'}} />

          <ListItemIcon>
            <IconButton  edge="end" aria-label="show" color="primary" onClick={() => showHideItem()}>
              <span className={shownNodeId === props.node.id ? "material-icons" : "material-icons-outlined"}>visibility</span>
            </IconButton>
          </ListItemIcon>

          <ListItemIcon><EditNodeDialog type="edit" node={props.node} /></ListItemIcon>

          <ListItemIcon>
            <IconButton edge="end" aria-label="delete" color="secondary" onClick={() => deleteItem()}>
              <span className="material-icons">delete</span>
            </IconButton>
          </ListItemIcon>
        </ListItem>
      )}
    </Draggable>
  );
}