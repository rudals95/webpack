import React, { useState, useCallback } from 'react';
import useInput from '../../../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Form, Label, Input, LinkContainer, Button, Error } from './style';
import { Box } from '@chakra-ui/react';

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
      } else setmismatchError(false);
    },
    [passwordCheck],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nickname, password, passwordCheck);
  };

  return (
    <>
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
