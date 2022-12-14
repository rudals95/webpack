import React, { useState, useCallback } from 'react';
import useInput from '../../../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Label, Input, LinkContainer, Button, Header } from './style';

import { store, changeName, changePassword } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const Login = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [resData, setResData] = useState({
    email: '',
    password: '',
    state: false,
  });
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const post = {
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    dispatch(changeName(email));
    dispatch(changePassword(password));
    // API('http://localhost:8095/api/login', post, resData, setResData);

    axios
      .post('http://localhost:8095/api/login', post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
    console.log(resData);
    // if (resData.state) {
    //   navigate('/main');
    // }
  };
  console.log(store);
  return (
    <>
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

      {/* <div className="dog" style={{ width: '200px', height: '200px' }}></div>
      <div
        className="cat"
        style={{ width: '200px', height: '200px', backgroundSize: '100%' }}
      >

      </div> */}
    </>
  );
};

export default Login;
