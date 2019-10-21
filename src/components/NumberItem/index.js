import React from 'react';
import { useDrag } from 'react-dnd';

/**
 * Number Item
 * @param {Number} id    Number id
 * @param {Number} label NUmber label
 * @param {String} type  NUmber type
 */
const NumberItem = ({ id, label, type, onCLick }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return <button type="button" ref={drag} onClick={() => onCLick(id)} className={`number ${isDragging ? 'number--is-dragging' : ''}`}>{label}</button>
}

export default NumberItem;
