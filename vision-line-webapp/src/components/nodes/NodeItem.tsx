import { Node } from "../../api";
import { ListItem, ListItemText, Typography } from '@material-ui/core';

export function NodeItem(props: {node: Node}) {
  const inputs = Object.entries(props.node.inputs ?? {}).map(([key, value]) => (
    <Typography key={key} variant="body1">{key}: <b>{value}</b></Typography>
  ));

  return (    
    <ListItem button>
      <ListItemText primary={props.node.name} secondary={inputs} secondaryTypographyProps={{component: 'div'}} />
    </ListItem>
  );
}