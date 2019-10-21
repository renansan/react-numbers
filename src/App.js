import React, { useState, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';

const Types = {
  NUMBER: 'number',
  ODD: 'odd',
  EVEN: 'even',
  PRIME: 'prime',
}

const getTypes = n => {
  const types = [];
  const isPrime = (value) => {
    for(var i = 2; i < value; i++) {
      if(value % i === 0) {
        return false;
      }
    }
    return value > 1;
  }

  if (n % 2 === 0) {
    types.push(Types.EVEN);
  } else {
    types.push(Types.ODD);
  }

  if (isPrime(n)) {
    types.push(Types.PRIME);
  }

  return types;
}

const customCanDrop = (itemId, accepted) => {
  const types = getTypes(itemId);
  return accepted === 'any' || types.includes(accepted)
}

function App() {
  const [boxes, setBox] = useState([
    {
      id: 'box-numbers',
      title: 'Numbers',
      errorMessage: '',
      accept: 'any',
    },
    {
      id: 'box-odd',
      title: 'Odd Numbers',
      errorMessage: 'Only odd numbers are allowed',
      accept: Types.ODD,
    },
    {
      id: 'box-even',
      title: 'Even Numbers',
      errorMessage: 'Only even numbers are allowed',
      accept: Types.EVEN,
    },
    {
      id: 'box-prime',
      title: 'Prime Numbers',
      errorMessage: 'Only prime numbers are allowed',
      accept: Types.PRIME,
    },
  ]);
  const [numbers, setNumber] = useState(new Array(12).fill().map((item, idx) => ({
    id: idx + 1,
    label: idx + 1,
    currentBox: 'box-numbers',
    type: Types.NUMBER,
  })));

  const handleDrop = useCallback(
    (item, box) => {
      const id = item.id;
      if (customCanDrop(id, box.accept)) {
        setNumber(prevState => {
          const numbers = prevState.map(number => {
            if (number.id === id) {
              number.currentBox = box.id;
            }
            return number;
          })
          return numbers;
        });
      }
    }
  );

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Drag and Drop Numbers</h1>
        </div>
      </header>
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <div className="boxes">
            {Array.isArray(boxes) && boxes.map(box => (
              <div key={box.id} className="box source-box">
                <h2>{box.title}</h2>
                <NumberArea box={box} onDrop={(item) => handleDrop(item, box)}>
                  {Array.isArray(numbers) && numbers.filter(number => number.currentBox === box.id).map(number => (
                    <NumberItem key={number.id} id={number.id} label={number.label} type={number.type} />
                  ))}
                </NumberArea>
              </div>
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  );
}

const NumberItem = ({ id, label, type }) => {
  const [collectedProps, drag] = useDrag({
    item: { id, type },
  });
  return <span ref={drag} className="number">{label}</span>
}

const NumberArea = ({ box, children, onDrop }) => {
  const { accept, errorMessage } = box;
  const [{ isOver, canDrop, currentItem }, drop] = useDrop({
    accept: Types.NUMBER,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      currentItem: monitor.getItem(),
    }),
  });

  const canDropIn = currentItem && customCanDrop(currentItem.id, accept);

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

export default App;
