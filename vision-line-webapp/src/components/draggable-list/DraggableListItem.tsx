import { cloneElement, DragEvent, RefObject, useState } from 'react';
import api from '../../services/data-service';

export function DraggableListItem(props: {
    children: JSX.Element, 
    ref?: RefObject<HTMLDivElement>, 
    onMoved?: (x: number) => void}) {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({top: 0})
  const [startPosition, setStartPosition] = useState({top: 0});

  function handleDragStart(event: DragEvent<HTMLElement>) {
    setDragging(true);
    event.dataTransfer.setData('text/plain', '');
    event.dataTransfer.setDragImage(new Image(0,0), 0, 0);
    event.dataTransfer.dropEffect = 'move';
    setStartPosition({top: event.clientY});
  }

  function handleDrag(event: DragEvent<HTMLElement>) {
    if (!event.clientY) return;
    setPosition({top: event.clientY - startPosition.top});
    props.onMoved && props.onMoved(event.clientY - startPosition.top);
  }

  function handleDragEnd(event: DragEvent<HTMLElement>) {
    setDragging(false);
    setPosition({top: 0});
  }

  return (
    <>
      <div draggable onDragStart={handleDragStart} onDrag={handleDrag} onDragEnd={handleDragEnd}
          style={{position: 'relative', top: position.top, zIndex: 100}} ref={props.ref}>
        {props.children}
      </div>

    </>
  )
}