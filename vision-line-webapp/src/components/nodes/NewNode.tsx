import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useState, useEffect, ChangeEvent } from 'react';
import { Function } from '../../api/models/Function';
import api from '../../services/data-service';
import { createNodeOnLine } from '../../actions/line-actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/root-reducer';
import { Node } from '../../api/models/Node';

export function NewNode(props: {[x:string]: any}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [functions, setFunctions] = useState<{selected: string, all: Function[]}>({selected: '', all: []});
  const [parameters, setParameters] = useState<any>({});
  const lineId = useSelector((state: RootState) => state.image.activeId??0);
  const lineLength = useSelector((state: RootState) => Object.keys(state.line.nodes??0).length);
  const dispatch = useDispatch();

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
    const node: Node = {
      name: functions.selected,
      position: lineLength,
      inputs: parameters
    }
    dispatch(createNodeOnLine(lineId, node));
    setDialogOpen(false);
  }

  function handleInputChange(name: string, value: any) {
    const p = {...parameters};
    p[name] = value;
    setParameters(p);
  }

  function openDialog() {
    setParameters({});
    setDialogOpen(true);
  }

  const params = functions.all.find(f => f.name === functions.selected)?.inputs?.map((input, i) => (
    <TextField id={input.name + "Param"} label={input.display} required autoFocus={i===0}
          value={parameters[input.name??'']} key={input.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(input.name??'', e.target.value)}/>
  )) ?? <></>;

  return (
    <>
    <Button onClick={() => openDialog()} variant="contained" color="primary" {...props}>Új</Button>
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      <DialogTitle>Új módosító</DialogTitle>

      <DialogContent>
        <div style={{display: 'flex', gap: '1rem', flexDirection: 'column', width: '400px', maxWidth: '90%'}}>
        <FormControl>
          <InputLabel htmlFor="function">Function</InputLabel>
          <Select id="function" name="function"
              value={functions.selected} onChange={(e: any) => setFunctions({ ...functions, selected: e.target.value,})}>
            {functions.all.map(f => (
              <MenuItem key={f.name} value={f.name}>{f.display ?? f.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {params}
        </div>
      </DialogContent>

      <DialogActions>        
        <Button onClick={() => setDialogOpen(false)}>Mégse</Button>
        <Button onClick={() => handleCreate()} color="primary" disabled={functions.selected.length === 0}>Hozzáad</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}