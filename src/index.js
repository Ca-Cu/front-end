import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.$url="http://ec2-18-233-156-102.compute-1.amazonaws.com:4567";
window.$pdf="http://ec2-3-86-155-8.compute-1.amazonaws.com:3000/CACU.pdf";

ReactDOM.render(
  <App />,
document.getElementById('root')
);