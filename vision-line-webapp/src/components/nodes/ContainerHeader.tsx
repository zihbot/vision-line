import { Typography } from '@material-ui/core';
import { EditNodeDialog } from './EditNodeDialog';
export function ContainerHeader(props: {}) {
  return (
    <div style={{display: 'flex'}}>
      <Typography variant="h4">Módosítók</Typography>
      <EditNodeDialog type="add" style={{marginLeft: 'auto'}}/>
    </div>
  );
}