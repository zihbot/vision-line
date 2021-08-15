import { ListItem, ListItemText } from "@material-ui/core";
import { Line } from "../../api";

export function LineItem(props: {line: Line, onClick?: ()=>void}) {

  const lastChange = new Date(props.line.lastChange ?? 0).toLocaleString();
  return (
    <ListItem button onClick={() => props.onClick && props.onClick()}>
      <ListItemText primary={props.line.name} secondary={lastChange} />
    </ListItem>
  );
}