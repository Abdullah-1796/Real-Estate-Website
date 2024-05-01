import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function handleLoad()
{
  axios.get("http://localhost:3001/").then(res => console.log(res.data.rows[0].username));
}

function App1() {
  return (
    <div className="App" onLoad={handleLoad()}>
      <h1>I am from App1.jsx</h1>
        <Link to={"/App2"} >App2.jsx</Link>
    </div>
  );
}

export default App1;
