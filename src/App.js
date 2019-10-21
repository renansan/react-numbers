import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NumberItem from './components/NumberItem';
import NumberArea from './components/NumberArea';
import ItemTypes from './ItemTypes';
import { customCanDrop } from './utils';
import './App.css';

const App = () => {
  const [boxes] = useState([
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
      accept: ItemTypes.ODD,
    },
    {
      id: 'box-even',
      title: 'Even Numbers',
      errorMessage: 'Only even numbers are allowed',
      accept: ItemTypes.EVEN,
    },
    {
      id: 'box-prime',
      title: 'Prime Numbers',
      errorMessage: 'Only prime numbers are allowed',
      accept: ItemTypes.PRIME,
    },
  ]);
  const [numbers, setNumber] = useState(new Array(12).fill().map((item, idx) => ({
    id: idx + 1,
    label: idx + 1,
    currentBox: 'box-numbers',
    type: ItemTypes.NUMBER,
  })));

  /**
   * Handle Drop
   * Update state on drop changes
   *
   * @param  {Object} item React Dnd Item's object
   * @param  {Object} box  Current box data
   */
  const handleDrop = (item, box) => {
    const id = item.id;
    if (customCanDrop(id, ItemTypes, box.accept)) {
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
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Drag and Drop Numbers</h1>
          <form className="form form-filter-numbers">
            <label className="form-control">
              <input type="checkbox" checked />
              <span>Odd</span>
            </label>
            <label className="form-control">
              <input type="checkbox" checked />
              <span>Even</span>
            </label>
            <label className="form-control">
              <input type="checkbox" checked />
              <span>Prime</span>
            </label>
          </form>
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

export default App;
