import React, { useEffect } from 'react';
import useInput from '../../../hooks/useInput';
import { Link } from 'react-router-dom';
import { Form, Label, Input, LinkContainer, Button, Header } from './style';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi, authToken } from '../../api';
import { setCookie } from './../../utils/cookie';
import { setLogin } from '../../store/slices/userSlice';
import { Box } from '@chakra-ui/react';

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const success = (txt) => toast.success(txt, { position: 'top-center' }); // 성공
  const error = (txt) => toast.error(txt, { position: 'top-center' }); // 실패

  const store = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      email: email,
      password: password,
    };
    loginApi(post)
      .then((res) => {
        console.log(res.data, 'res');
        if (res.data.loginSuccess)
          setCookie('access_token', res.data.data.token);
        //스토어 유저 정보 업데이트
        dispatch(
          setLogin({
            _id: res.data.data.user._id,
            username: res.data.data.user.username,
            email: res.data.data.user.email,
            role: res.data.data.user.admin,
            isLogin: true,
            // token: res.data.data.token,
          }),
        );
        sessionStorage.setItem(
          'userData',
          JSON.stringify({
            _id: res.data.data.user._id,
            username: res.data.data.user.username,
            email: res.data.data.user.email,
            role: res.data.data.user.admin,
            isLogin: true,
          }),
        );
      })
      .catch((err) => {
        console.log(err.response.data, 'err');
        error(err.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div id="container">
        {/* <Header>로그인</Header> */}
        <Box textAlign="center" fontSize="24px" m="30px 0" fontWeight="700">
          로그인
        </Box>
        <Form onSubmit={handleSubmit}>
          <Label id="email-label">
            <span>이메일 주소</span>
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </Label>
          <Button type="submit">로그인</Button>
        </Form>
        <LinkContainer>
          <Link to="/join">회원가입</Link>
        </LinkContainer>
      </div>
    </>
  );
};

export default Login;
