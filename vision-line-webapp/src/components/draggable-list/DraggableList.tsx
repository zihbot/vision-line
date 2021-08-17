import { DraggableListItem } from "./DraggableListItem";
import { createRef, RefObject, useState, useEffect } from 'react';
import { useRef } from "react";

export function DraggableList(props: {children: JSX.Element[]}) {
  const [positions, setPositions] = useState(props.children.map((_, i) => i));
  const [movement, setMovement] = useState<{top: number, bottom: number, pos: number}|undefined>();

  function handleMove(top?: number, bottom?: number, pos?: number) {
    if (!top || !bottom || typeof pos === 'undefined') {
      // No dragging
      setPositions(props.children.map((_, i) => i));
      setMovement(undefined);
      return;
    }
    setMovement({top: top, bottom: bottom, pos: pos});
  }

  function handleSwitch(pos: number) {
    if (!movement) return;
    setPositions(positions.map(x => {
      if (x === pos) return movement.pos;
      if (x === movement.pos) return pos;
      return x;
    }));    
  }

  return (
    <>
      {props.children.map((child, i) => (
        <DraggableListItem key={i} position={positions[i]} movement={movement}
          onMoved={(top, bottom) => handleMove(top, bottom, positions[i])}
          onSwithced={() => handleSwitch(positions[i])}>
            {child}
        </DraggableListItem>
      ))}
    </>
  );
}