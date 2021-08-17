import { cloneElement, DragEvent, forwardRef, RefObject, useState, createRef, useRef, useEffect } from 'react';
import api from '../../services/data-service';

export function DraggableListItem(props: {
    children: JSX.Element, 
    onMoved?: (top?: number, bottom?: number) => void,
    onSwithced?: () => void,
    position: number,
    movement?: {top: number, bottom: number, pos: number}}) {
  const [dragging, setDragging] = useState(false);
  const [inTarnsition, setInTarnsition] = useState(false);
  const [position, setPosition] = useState({top: 0})
  const [dragStartPosition, setDragStartPosition] = useState({top: 0});
  const ref = useRef<HTMLDivElement>(null);

  // Calculate if should move
  useEffect(() => {
    if (!props.movement) {
      setPosition({top: 0});
      return;
    }
    if (dragging || props.movement.pos === props.position 
      || Math.abs(props.movement.pos - props.position) != 1 || inTarnsition) return;

    const rect = ref.current?.getBoundingClientRect() ?? new DOMRect;
    const middle = (rect.top + rect.bottom) / 2;
    if (props.movement && props.movement.top < middle && props.movement.bottom > middle) {
      // Should change position
      console.log('MOVE', props.movement, rect, middle, props.position);
      const shift = (props.movement.bottom - props.movement.top) * (props.movement.pos - props.position);
      setPosition({top: position.top + shift});
      setInTarnsition(true);
      props.onSwithced && props.onSwithced();
    }
  }, [props.movement]);

  useEffect(() => {
    ref.current?.addEventListener('transitionend', () => {
      setInTarnsition(false);
    });
  }, [ref]);

  function handleDragStart(event: DragEvent<HTMLElement>) {
    setDragging(true);
    event.dataTransfer.setData('text/plain', '');
    event.dataTransfer.setDragImage(new Image(0,0), 0, 0);
    event.dataTransfer.dropEffect = 'move';
    setDragStartPosition({top: event.screenY});
    event.stopPropagation();
  }

  function handleDrag(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.screenY) return;
    setPosition({top: event.screenY - dragStartPosition.top});
    console.log('E',event);
    const rect = event.currentTarget.getBoundingClientRect();
    props.onMoved && props.onMoved(rect.top, rect.bottom);
  }

  function handleDragEnd(event: DragEvent<HTMLElement>) {
    setDragging(false);
    setPosition({top: 0});
    props.onMoved && props.onMoved();
  }

  return (
    <>
      <div draggable onDragStart={handleDragStart} onDrag={handleDrag} onDragEnd={handleDragEnd} ref={ref}
          style={{position: 'relative', top: position.top, zIndex: dragging ? 100 : 0,
          transition: !dragging ? 'top .2s' : ''}}>
        {props.children}
      </div>

    </>
  )
}