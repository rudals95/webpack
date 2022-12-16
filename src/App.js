import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Main } from './components/main/index';
import Login from './pages/login/index';
import Join from './pages/join/index';
import { authToken } from './api';
import { useSelector, useDispatch } from 'react-redux';
import { isAccessToken, isRefreshToken } from './utils/LoginUtils';
import './app.css';
import { setLogin } from './store/slices/userSlice';

export default function App() {
  const [loginSuccese, setLoginSuccese] = useState(true);
  const store = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const isLogin = async () => {
    await authToken().then((res) => {
      console.log(res.data, '로그인시 디비속 조회');
      // console.log(isAccessToken(), '쿠키속 토큰조회');
      //쿠키에 토큰없으면 스토어 로그인 정보 저장 로그인여부 true/false
      // if (isAccessToken()) {
      //   dispatch(
      //     setLogin({
      //       _id: res.data._id,
      //       name: res.data.name,
      //       email: res.data.email,
      //       role: res.data.role,
      //       token: res.data.token,
      //       isLogin: true,
      //     }),
      //   );
      // } else return;
    });
  };

  // const refreshPage = async () => {
  //   //새로고침 및 액세스 토큰 만료시 재발급
  //   if (!isAccessToken()) {
  //     //액세스 토큰 체크
  //     const refresh_token = isRefreshToken(); //리프레쉬 토큰
  //     if (refresh_token) {
  //       //리프레쉬 토큰 체크
  //       const { status, data } = await renewal_AccessToken(refresh_token);
  //       console.log(data);
  //       if (status === 200) {
  //         // 리프레쉬 토큰 재발급 성공
  //         console.log('Success Renewal Access Token!');
  //         dispatch(authLogin(data)); //새로받은 유저 정보 리덕스에 패칭
  //       }
  //     } else {
  //       logout(); //쿠키 삭제 및 유저 정보 삭제
  //       dispatch(authLogout()); //유저 정보가 없는 경우 로그아웃
  //     }
  //   } else {
  //     //엑세스 토큰이 있는 경우(세션스토리지에 있는 유저 정보 체크)

  //     const isSession = JSON.parse(sessionStorage.getItem('user_data'));
  //     if (isSession !== null && isSession.isAuthenticated) {
  //       dispatch(refreshLogin(isSession)); //세션스토리지에 유저 정보가 있는 경우 리덕스에 패칭
  //     } else {
  //       logout(); //쿠키 삭제 및 유저 정보 삭제
  //       dispatch(authLogout()); //유저 정보가 없는 경우 로그아웃
  //     }
  //   }
  // };

  // useEffect(() => {
  //   refreshPage(); //새로고침 및 액세스 토큰 만료시 재발급
  // }, []);

  useEffect(() => {
    // isLogin();
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
