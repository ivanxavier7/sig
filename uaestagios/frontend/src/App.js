import logo from './logo.svg';
import './App.css';
import SecondComponent from './Components/SecondComponent';
import React from 'react';

function App() {
  function appleDisplay(n) {
    if (n === 1) {
      return `John has ${n} apple`;
    }
    else if (n > 1) {
      return `John has ${n} apples`;
    }
    else {
      return `John owes us ${Math.abs(n)} apples`;
    }
  }
  return (
    <div>
      <h1>{appleDisplay(1)}</h1>
      <h1>{appleDisplay(2)}</h1>
      <h1>{appleDisplay(-2)}</h1>
    </div>
  );
}

export default App;
