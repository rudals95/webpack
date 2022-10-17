import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from '../redux/store';

import 'bootstrap/dist/css/bootstrap.css';

const container = document.getElementById('root');
const root = createRoot(container);
// console.log(store);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
