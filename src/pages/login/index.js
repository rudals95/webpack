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
import axios from 'axios';
import { useEffect } from 'react';
import API from './../../utils/API';

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
        console.log(res.data, 'res');
        if (res.data.loginSuccess) setCookie('access_token', res.data.token);
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
        // console.log(err.response.data, 'err');
        // if (!err.response.data.loginSuccess) error(err.response.data.message);
      });
  };

  // const printLater = (number) => {
  //   return new Promise((resolve) => {
  //     console.log(number);
  //     resolve(number);
  //   });
  // };
  // printLater(1).then(printLater(2));

  // const getData = () => {
  //   return new Promise((resolve) => {
  //     API.get('/api/auth/check').then((res) => {
  //       console.log(res, 'ddddd');
  //       resolve(res.data);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getData().then(console.log('dd'));
  // }, []);

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
