import React from 'react';

import { Button, Box } from '@chakra-ui/react';
import { Header } from '../Header';
import { SideBar } from '../Sidebar/index';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/slices/userSlice';
import { removeCookie } from '../../utils/cookie';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Contents } from './../Contents';

export const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('access_token');
    dispatch(
      setLogin({
        _id: '',
        name: '',
        email: '',
        role: '',
        token: '',
        isLogin: false,
      }),
    );
    navigate('/');
  };

  return (
    <div>
      <Header />
      <Box maxW="1200px" m="0 auto" mt="20px" p="20px">
        <SideBar />
        <Contents>
          <Routes>
            <Route path="/1" element={<div> 1</div>} />
            <Route path="/2" element={<div> 2</div>} />
            <Route path="/3" element={<div> 3</div>} />
          </Routes>
        </Contents>

        <Button m="20px 0 0 20px" onClick={logout}>
          로그아웃
        </Button>
      </Box>
    </div>
  );
};
