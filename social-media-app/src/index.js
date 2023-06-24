import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
);



// ReactDOM.render(
//   <BrowserRouter>
//   <App />
//     </BrowserRouter>
//   ,
// document.getElementById("root")
// );

// const root = document.getElementById("root");
// render(
//   <BrowserRouter>
//   <App />
//     </BrowserRouter>, root);


