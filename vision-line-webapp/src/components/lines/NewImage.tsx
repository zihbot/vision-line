import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewImage } from '../../actions/image-actions';

export function NewImage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  
  function handleCreate() {
    dispatch(createNewImage(name));
    setDialogOpen(false);
  }

  return (
    <>
    <Button onClick={() => setDialogOpen(true)}>Új kép</Button>
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      <DialogTitle>Új kép létrehozása</DialogTitle>

      <DialogContent>
        <TextField id="imageName" label="Kép neve" required autoFocus 
          value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
      </DialogContent>

      <DialogActions>        
        <Button onClick={() => setDialogOpen(false)}>Mégse</Button>
        <Button onClick={() => handleCreate()} color="primary" disabled={name.length === 0}>Létrehoz</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}