import { DraggableListItem } from "./DraggableListItem";
import { createRef, RefObject, useState } from 'react';
import { useRef } from "react";

export function DraggableList(props: {children: JSX.Element[]}) {
  const items = useRef<RefObject<HTMLDivElement>[]>([]);
  if (items.current.length !== props.children.length) {
    items.current = Array(props.children.length).map((_, i) => items.current[i] || createRef());
  }

  function handleMove(x: number, i: number) {
    
  }

  return (
    <>
      {props.children.map((child, i) => (
        <DraggableListItem ref={items.current[i]} key={i} onMoved={x => handleMove(x, i)}>{child}</DraggableListItem>
      ))}
    </>
  );
}