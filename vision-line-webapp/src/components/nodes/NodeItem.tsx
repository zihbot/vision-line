import { Node } from "../../api";
import { ListItem, ListItemText, Typography } from '@material-ui/core';

export function NodeItem(props: {node: Node}) {
  const inputs = Object.entries(props.node.inputs ?? {}).map((key, value) => (
    <Typography variant="body1">{key}: <b>{value}</b></Typography>
  ));

  return (    
    <ListItem>
      <ListItemText primary={props.node.name} secondary={inputs} />
    </ListItem>
  );
}