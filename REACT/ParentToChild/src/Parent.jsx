import React, { useState } from 'react';
import Child from './Child';
const Parent = () => {
  const [data, setData] = useState('');
  const [show, setShow] = useState('');
  function sendData() {
    setData(show);
  }
  function loadData(e) {
    setShow(e.target.value);
  }
  return (
    <>
      <Child sendData={data} />
      <input onChange={(e) => loadData(e)} />
      <button onClick={sendData}>Click</button>
    </>
  );
};
export default Parent;
