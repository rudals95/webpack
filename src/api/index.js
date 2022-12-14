import API from '../../src/utils/API';

const headers = { 'Content-Type': 'application/json' };

// 가입
export const joinData = (data) => {
  const url = '/api/users/register';
  const config = {
    headers,
  };
  return API.post(url, data, config);
};

// 로그인
export const login = (data) => {
  const url = '/tenant/user/login';
  const config = {
    headers,
  };
  return API.post(url, data, config);
};

// 회원가입
export const signUp = (data) => {
  const url = '/tenant/user/save';
  const config = {
    headers,
  };
  return API.post(url, data, config);
};
