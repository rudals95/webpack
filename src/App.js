import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Main } from './page/Main';
import Login from './page/Login/index';
import Join from './page/Join/index';
import './app.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Routes>
          <Route path="/main" element={<Main />} />

          <Route path="/*" element={<Login />} />

          <Route path="/join" element={<Join />} />
        </Routes>
      </ChakraProvider>
    </Provider>
  );
}
