import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, IconButton } from '@material-ui/core';
import { useState, useEffect, ChangeEvent } from 'react';
import { Function } from '../../api/models/Function';
import api from '../../services/data-service';
import { createNodeOnLine, editNodeOnLine } from '../../actions/line-actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/root-reducer';
import { Node } from '../../api/models/Node';

export function EditNodeDialog({type, node, ...additionalProps}: {
  type: 'add' | 'edit',
  node?: Node,
  [x:string]: any}
) {
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

  useEffect(resetParameters, [functions.selected, functions.all, node]);

  function handleCreate() {
    const node: Node = {
      name: functions.selected,
      position: lineLength,
      inputs: parameters
    }
    dispatch(createNodeOnLine(lineId, node));
    setDialogOpen(false);
  }

  function handleEdit() {
    const editedNode: Node = {
      name: functions.selected,
      position: node?.position,
      inputs: parameters
    }
    dispatch(editNodeOnLine(lineId, node?.position??0, editedNode));
    setDialogOpen(false);
  }

  function handleInputChange(name: string, value: any) {
    const p = {...parameters};
    p[name] = value;
    setParameters(p);
  }

  function openDialog() {
    resetParameters();
    if (node) {
      setFunctions({ ...functions, selected: node.name??'' });
    }
    setDialogOpen(true);
  }

  function resetParameters() {
    const currentFunction = functions.all.find(f => f.name === functions.selected);

    if (node && node.name === currentFunction?.name) {
      setParameters(node.inputs);
      return;
    }

    const params: any = {};
    currentFunction?.inputs?.forEach(i => {
      params[i.name??''] = '';
    });
    setParameters(params);
  }

  const params = functions.all.find(f => f.name === functions.selected)?.inputs?.map((input, i) => (
    <TextField id={input.name + "Param"} label={input.display} required autoFocus={i===0}
          value={parameters[input.name??''] ?? ''} key={input.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(input.name??'', e.target.value)}/>
  )) ?? <></>;

  return (
    <>
    { type === 'add' &&
      <Button onClick={() => openDialog()} variant="contained" color="primary" {...additionalProps}>Új</Button>}
    { type === 'edit' &&
      <IconButton edge="end" aria-label="edit" color="primary" onClick={() => openDialog()}>
        <span className="material-icons">edit</span>
      </IconButton>}
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      <DialogTitle>Új módosító</DialogTitle>

      <DialogContent>
        <div style={{display: 'flex', gap: '1rem', flexDirection: 'column', width: '400px', maxWidth: '90%'}}>
        <FormControl>
          <InputLabel htmlFor="function">Módosító</InputLabel>
          <Select id="function" name="function"
              value={functions.selected} onChange={(e: any) => setFunctions({ ...functions, selected: e.target.value})}>
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
        { type === 'add' &&
          <Button onClick={() => handleCreate()} color="primary" disabled={functions.selected.length === 0}>Hozzáad</Button>}
        { type === 'edit' &&
          <Button onClick={() => handleEdit()} color="primary" disabled={functions.selected.length === 0}>Szerkeszt</Button>}
      </DialogActions>
    </Dialog>
    </>
  );
}