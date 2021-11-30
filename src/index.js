import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.$url="http://ec2-18-212-186-66.compute-1.amazonaws.com:4567";
window.$pdf="http://ec2-34-238-51-75.compute-1.amazonaws.com:3000";

ReactDOM.render(
  <App />,
document.getElementById('root')
);