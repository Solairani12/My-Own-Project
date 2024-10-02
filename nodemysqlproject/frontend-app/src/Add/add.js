import React, { useState } from 'react';
import './add.css'; 

function Add() {
  
  const [count, setCount] = useState(200);

  
  const updateDisplayStyle = () => {
    if (count > 200) {
      return { backgroundColor: 'lightgreen' };
    } else if (count < 200) {
      return { backgroundColor: 'lightcoral' };
    }
    
    return {};
  };

  return (
    <div style={updateDisplayStyle()} className="counter-container">
      <h1>Increment and Decrement</h1>

      {}
      <div id="counterDisplay">
        <h2 id="counterValue" style={{ color: 'black' }}>{count}</h2>
      </div>

      {}
      <button onClick={() => setCount(count + 2)}>Increment +</button>
      <button onClick={() => setCount(count - 2)}>Decrement -</button>
    </div>
  );
}

export default Add;
