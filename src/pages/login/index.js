import React, { useState, useCallback } from 'react';
import useInput from '../../../hooks/useInput';
import { Link } from 'react-router-dom';
import { Form, Label, Input, LinkContainer, Button, Header } from './style';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loginApi } from '../../api';
import { setCookie } from './../../utils/cookie';
import { setLogin } from '../../store/slices/userSlice';

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const success = (txt) => toast.success(txt, { position: 'top-center' }); // 성공
  const error = (txt) => toast.error(txt, { position: 'top-center' }); // 실패

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      email: email,
      password: password,
    };
    loginApi(post)
      .then((res) => {
        if (!res.data.loginSuccess) return error(res.data.message);
        setCookie('access_token', res.data.user.token);

        //로그인시 디비 속 받아 토큰 굽기
        //스토어 유저 정보 업데이트
        dispatch(
          setLogin({
            _id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            role: res.data.user.role,
            token: res.data.user.token,
            isLogin: true,
          }),
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <ToastContainer />
      <div id="container">
        <Header>로그인</Header>
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
