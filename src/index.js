
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import LLogin from './login';
// import Register from './register';
// import Px from './px';
import { BrowserRouter } from "react-router-dom";
import Routeit from './Routes';
// import APPP from './App1';
// import Cart from './Cart';
// import Buynow from './Buynow';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routeit/>
    </BrowserRouter>
    {/* <LLogin/> */}
    {/* <APPP/> */}
    {/* <Px/> */}
  </React.StrictMode>
);