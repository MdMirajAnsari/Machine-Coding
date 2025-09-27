import React, { useState } from 'react';
import ChildComponent from './Child.jsx';

function ParentComponent() {
  const [childData, setChildData] = useState('');

  // Callback function to receive data from child
  const handleChildData = (data) => {
    setChildData(data);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Data from child: {childData}</p>
      <ChildComponent onData={handleChildData} />
    </div>
  );
}

export default ParentComponent;
