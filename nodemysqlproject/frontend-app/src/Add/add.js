import React, { useState } from 'react';
import './add.css'; // Adjust the path as necessary

function Add() {
  // Initial count value set to 200
  const [count, setCount] = useState(200);

  // Function to update the display based on the count value
  const updateDisplayStyle = () => {
    if (count > 200) {
      return { backgroundColor: 'lightgreen' };
    } else if (count < 200) {
      return { backgroundColor: 'lightcoral' };
    }
    return { backgroundColor: 'white' };
  };

  return (
    <div style={updateDisplayStyle()} className="counter-container">
      <h1>Increment and Decrement</h1>

      {/* Counter Display */}
      <div id="counterDisplay">
        <h2 id="counterValue" style={{ color: 'black' }}>{count}</h2>
      </div>

      {/* Increment and Decrement Buttons */}
      <button onClick={() => setCount(count + 2)}>Increment +</button>
      <button onClick={() => setCount(count - 2)}>Decrement -</button>
    </div>
  );
}

export default Add;
