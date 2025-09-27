import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [d, sd] = useState([]);

  const sda = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => sd(data));
  };
  return (
    <div>
      <button onClick={sda}>Click</button>
      {d.map((d) => (
        <>
          <div>{d.id}</div>
          <div>{d.email}</div>
        </>
      ))}
    </div>
  );
}
