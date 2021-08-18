import { Typography } from '@material-ui/core';
import { NewNode } from './NewNode';
export function ContainerHeader(props: {}) {
  return (    
    <div style={{display: 'flex'}}>
      <Typography variant="h4">Módosítók</Typography>
      <NewNode style={{marginLeft: 'auto'}}/>
    </div>
  );
}