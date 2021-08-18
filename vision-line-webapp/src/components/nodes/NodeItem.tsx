import { IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { Node } from "../../api";
import { deleteNodeOnLine } from '../../actions/line-actions';
import { RootState } from '../../reducers/root-reducer';

export function NodeItem(props: {node: Node}) {
  const dispatch = useDispatch();
  const lineId = useSelector((state: RootState) => state.image.activeId);

  function deleteItem() {
    dispatch(deleteNodeOnLine(lineId??0, props.node.id??0));
  }

  const inputs = Object.entries(props.node.inputs ?? {}).map(([key, value]) => (
    <Typography key={key} variant="body1">{key}: <b>{value}</b></Typography>
  ));

  return (
    <Draggable draggableId={''+props.node.position} index={props.node.position??0}>
      {provided => (
        <ListItem button ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <ListItemText primary={props.node.name} secondary={inputs} secondaryTypographyProps={{component: 'div'}} />                  
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