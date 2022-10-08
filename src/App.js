import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import Main from './Components/Main';
import { Test } from './page/Test';

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
    </Routes>
  );
}
