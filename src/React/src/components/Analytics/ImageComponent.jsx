import React from 'react';
import graph1 from './graph1.png'
import graph2 from './graph2.png'

const ImageComponent = () => {
  return (
    <div>
      <img src={graph1} alt="Image 1" style={{ width: '100vh', height: '100vh' }} draggable="false"/>
      <img src={graph2} alt="Image 2" style={{ width: '100vh', height: '100vh' }} draggable="false"/>
    </div>
  );
};

export default ImageComponent;
