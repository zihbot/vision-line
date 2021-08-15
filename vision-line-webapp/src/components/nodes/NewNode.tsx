import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Function } from '../../api/models/Function';
import api from '../../services/data-service';

export function NewNode(props: {[x:string]: any}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [functions, setFunctions] = useState<{selected: string, all: Function[]}>({selected: '', all: []});

  useEffect(() => {
    if (functions.all.length === 0) {
      api().functionsGet().subscribe({
        next: data => {
          setFunctions({selected: data[0]?.name ?? '', all: data});
        }
      });
    }
  }, [functions.all]);
  
  function handleCreate() {
    //dispatch(createNewImage(name));
    setDialogOpen(false);
  }

  return (
    <>
    <Button onClick={() => setDialogOpen(true)} variant="contained" color="primary" {...props}>Új</Button>
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      <DialogTitle>Új módosító</DialogTitle>

      <DialogContent>     
        <FormControl>
          <InputLabel htmlFor="function">Function</InputLabel>
          <Select native id="function" name="function"
              value={functions.selected} onChange={(e: any) => setFunctions({ ...functions, selected: e.target.value,})}>
            {functions.all.map(f => (
              <option value={f.name}>{f.display ?? f.name}</option>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>        
        <Button onClick={() => setDialogOpen(false)}>Mégse</Button>
        <Button onClick={() => handleCreate()} color="primary" disabled={functions.selected.length === 0}>Hozzáad</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}