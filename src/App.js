import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Main } from './components/main/index';
import Login from './pages/login/index';
import Join from './pages/join/index';
import { useSelector, useDispatch } from 'react-redux';
import './app.css';
import { getCookie } from './utils/cookie';
import { setLogin } from './store/slices/userSlice';

export default function App() {
  const [loginSuccese, setLoginSuccese] = useState(true);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userReducer);

  // const loginCheck = () => {
  //   if (getCookie('access_token')) {
  //     console.log('로그인 상태');
  //     dispatch(
  //       setLogin({
  //         isLogin: true,
  //       }),
  //     );
  //   } else {
  //     console.log('로그아웃상태');
  //   }
  // };

  useEffect(() => {
    // loginCheck();
    if (store.user.isLogin) {
      setLoginSuccese(true);
    } else setLoginSuccese(false);
  }, [store.user.isLogin]);

  return (
    <ChakraProvider>
      <Routes>
        {!loginSuccese ? (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </>
        ) : (
          <Route path="/*" element={<Main />} />
        )}
        {/* <Route path="/*" element={<Login />} /> */}
      </Routes>
    </ChakraProvider>
  );
}
