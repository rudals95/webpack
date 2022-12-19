import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { setLogin } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { authToken, logoutApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from './../../utils/cookie';

export const Header = ({ title }) => {
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem('userData'));
  const loginCheck = () => {
    if (getCookie('access_token')) {
      console.log('로그인 상태');

      if (user !== null) {
        dispatch(
          setLogin({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isLogin: true,
          }),
        );
      }
    } else {
      console.log('로그아웃상태');
    }
  };
  const logout = async () => {
    await logoutApi({ email: user.email }).then((res) => {
      console.log(res);
    });
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
    // navigate('/');
  };

  const apiToken = async () => {
    await authToken().then((res) => {
      console.log(res.data);
    });
  };
  useEffect(() => {
    // apiToken();
    loginCheck();
  }, []);
  return (
    <>
      <Box m="0 auto" mt="0px" p="20px">
        <div onClick={logout}>ddd</div>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          {title}
        </Text>
      </Box>
    </>
  );
};
