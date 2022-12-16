import API from '../../src/utils/API';

const headers = { 'Content-Type': 'application/json' };

// 가입
export const signUp = (data) => {
  const url = '/api/auth/register';
  const config = {
    headers,
  };
  return API.post(url, data, config);
};

// 로그인
export const loginApi = (data) => {
  const url = '/api/auth/login';
  const config = {
    headers,
  };
  return API.post(url, data, config);
};
// 토큰조회
export const authToken = (data) => {
  const url = '/api/auth/check';
  const config = {
    headers,
  };
  return API.get(url, data, config);
};

export const userList = (data) => {
  const url = '/api/users/list';
  const config = {
    headers,
    data,
  };
  return API.get(url, data, config);
};
