import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [f, sf] = useState([]);
  var filter = [];
  function handleClick(e) {
    e.preventDefault();
    if (e.target.value == 'name') {
      filter = data.map((x) => x.name);
      sf(filter);
    } else if (e.target.value == 'id') {
      filter = data.map((x) => x.id);
      sf(filter);
      console.log(filter);
    } else if (e.target.value == 'email') {
      filter = data.map((x) => x.email);
      console.log(filter);
      sf(filter);
    }
  }
  console.log(data);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((d) => d.json())
      .then((d) => setData(d));
  }, []);
  return (
    <div>
      <select onClick={handleClick}>
        <option value="id">ID</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
      </select>
      <div>Data:--</div>
      <div>
        {f.map((m) => (
          <>
            <div>{m}</div>
          </>
        ))}
      </div>
    </div>
  );
}
