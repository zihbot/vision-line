import { Button, Drawer, List } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/data-service';
import { Line } from '../../api/models/Line';
import { LineItem } from "./LineItem";
import { setActiveImage } from '../../actions/image-actions';
import { RootState } from '../../reducers/root-reducer';

export function SideBar() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const imageId = useSelector((state: RootState) => state.image.activeId);
  const modified = useSelector((state: RootState) => state.image.modified);

  const dispatch = useDispatch();

  useEffect(() => {
    api().linesGet().subscribe({
      next: data => {
        setLines(data);
      }
    });
  }, [imageId, modified]);

  function handleClick(id: number) {
    dispatch(setActiveImage(id));
    setOpen(false);
  }

  return (
    <>
      <Button onClick={e => setOpen(true)}>Képek</Button>
      <Drawer open={open} onClose={(e, r) => setOpen(false)}>
        <List>
          {lines.map(line => (
            <LineItem onClick={() => handleClick(line.id??0)} key={line.id} line={line}/>
          ))}
        </List>
      </Drawer>
    </>
  );
}