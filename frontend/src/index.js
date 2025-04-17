import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Router ekledik
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// index.js'deki Router'ı kaldır (sadece App.js'de kullan)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
