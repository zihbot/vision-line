import { ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Line } from "../../api";
import { deleteLine } from '../../actions/line-actions';

export function LineItem(props: {line: Line, onClick?: ()=>void}) {
  const dispatch = useDispatch();

  function deleteItem() {
    dispatch(deleteLine(props.line.id??0));
  }

  const lastChange = new Date(props.line.lastChange ?? 0).toLocaleString();
  return (
    <ListItem button onClick={() => props.onClick && props.onClick()}>
      <ListItemText primary={props.line.name} secondary={lastChange} />
      <ListItemIcon>
        <IconButton edge="end" aria-label="delete" color="secondary" onClick={() => deleteItem()}>
          <span className="material-icons">delete</span>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}