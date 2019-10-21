import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../ItemTypes';
import { customCanDrop } from '../../utils';

/**
 * Number Area
 * @param {Object}   box      Box data
 * @param {Object}   children Box children
 * @param {Function} onDrop   onDrop callback
 */
const NumberArea = ({ box, children, onDrop }) => {
  const { accept, errorMessage } = box;
  const [{ isOver, canDrop, currentItem }, drop] = useDrop({
    accept: ItemTypes.NUMBER,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      currentItem: monitor.getItem(),
    }),
  });

  const canDropIn = currentItem && customCanDrop(currentItem.id, ItemTypes, accept);

  const isOverClass = (isOver) ? 'drop-area--over' : '';
  const canDropClass = (canDrop) ? 'drop-area--can-drop' : '';
  const canDropInClass = (canDrop && canDropIn) ? 'drop-area--can-drop-in' : '';
  const cantDropInClass = (canDrop && !canDropIn) ? 'drop-area--cant-drop-in' : '';

  return (
    <div
      ref={drop}
      className={`numbers drop-area ${isOverClass} ${canDropClass} ${canDropInClass} ${cantDropInClass}`}
      data-error={errorMessage}
    >
      {children}
    </div>
  )
}

export default NumberArea;
