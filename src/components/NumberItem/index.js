import React from 'react';
import { useDrag } from 'react-dnd';

/**
 * Number Item
 * @param {Number} id    Number id
 * @param {Number} label NUmber label
 * @param {String} type  NUmber type
 */
const NumberItem = ({ id, label, type }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  return <span ref={drag} className={`number ${isDragging ? 'nuber--is-dragging' : ''}`}>{label}</span>
}

export default NumberItem;
