import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function App2() {
  return (
    <div className="App">
      <h1>I am from App2.jsx</h1>
        <Link to={"/"} >App1.jsx</Link>
    </div>
  );
}

export default App2;
