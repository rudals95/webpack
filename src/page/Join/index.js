import React, { useState, useCallback } from 'react';
import useInput from '../../../hooks/useInput';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Form, Label, Input, LinkContainer, Button, Error } from './style';
import { Box } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { joinData } from './../../api/index';
import { useEffect } from 'react';
import axios from 'axios';

const Join = () => {
  const [nickname, onChangeNickName, setNickName] = useInput('');
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setmismatchError] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      if (e.target.value !== passwordCheck) {
        setmismatchError(true);
      } else setmismatchError(false);
    },
    [password],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      if (e.target.value !== password) {
        setmismatchError(true);
        // error('비밀번호가 일치하지 않습니다.');
      } else setmismatchError(false);
    },
    [passwordCheck],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      email: email,
      name: nickname,
      password: password,
    };
    if (email === '') return error('이메일을입력하세요');
    if (nickname === '') return error('이름을입력하세요');
    if (password === '') return error('비밀번호를입력하세요');
    if (password !== passwordCheck) return error('비밀번호가 일치하지않습니다');
    console.log(email, nickname, password, passwordCheck);
    await joinData(post)
      .then((res) => console.log('결과', res))
      .catch((err) => console.log('err', err.response));
  };
  // 성공 알람 ( 초록색 창 )
  const success = (txt) => toast.success(txt, { position: 'top-center' });
  // 실패 알람 ( 빨간색 창 )
  const error = (txt) => toast.error(txt, { position: 'top-center' });

  return (
    <>
      <ToastContainer />
      <Box p="20px">
        <div id="container">
          <Header title={'가입'} />
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
            <Label id="nickname-label">
              <span>닉네임</span>
              <div>
                <Input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={nickname}
                  onChange={onChangeNickName}
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
            <Label id="password-check-label">
              <span>비밀번호 확인</span>
              <div>
                <Input
                  type="password"
                  id="password-check"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </div>

              {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
              {!nickname && <Error>닉네임을 입력해주세요.</Error>}
              {/*{signUpError && <Error>이미 가입된 이메일입니다.</Error>}*/}
              {/*{signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}*/}
            </Label>
            <Button type="submit">회원가입</Button>
          </Form>
          <LinkContainer>
            <Link to="/login">로그인 하러가기</Link>
          </LinkContainer>
        </div>
      </Box>
    </>
  );
};

export default Join;
