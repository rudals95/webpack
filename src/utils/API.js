/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { getCookie } from './cookie';

// API 인스턴스 생성
const API = axios.create({
  baseURL: 'http://localhost:3090',
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const data = config;
    const accessToken = getCookie('accessToken');
    data.headers = {
      Authorization: `${accessToken}`,
      Accept: '*/*',
    };
    return data;
  },
  (err) => {
    console.log('api보낼거 오류', err.response.data);
    return Promise.reject(err);
  },
);

// API.interceptors.response.use(
//   // 요청 응답받고 상태코드별 대응
//   async (res) => {
//     // console.log(res.data.data);
//     // console.log(res);
//     const refresh_token = getCookie('refresh_token');
//     const originalRequest = res.config;

//     if (refresh_token && refresh_token !== undefined) {
//       // 리프레쉬 토큰이 있는 경우 재발급

//       const res = await renewal_AccessToken(refresh_token);
//       if (res.data.code === 200) {
//         //새로운 액세스토큰 발급성공

//         const newAccessToken = res.data.data.accessTokenValue;
//         axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`; //새로 받은 액세스 토큰 헤더값에 추가
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return await axios(originalRequest); //새로운 액세스 토큰으로 에러 요청을 재요청
//       }
//     } else {
//       //리프레쉬 토큰이 만료됐거나 올바른 값이 아닌 경우
//       alert('로그인 정보가 존재하지 않습니다. 다시 로그인해주세요.');
//       logout();
//       window.location.replace('/login'); //로그인 페이지로 이동
//     }
//     return res;
//   },

//   async (err) => {
//     return new Promise(async (resolve, reject) => {
//       const refresh_token = getCookie('refresh_token');
//       const originalRequest = err.config;

//       if (
//         err.response.status === 403 &&
//         refresh_token &&
//         refresh_token !== undefined
//       ) {
//         // console.log(err.response);
//         const res = await renewal_AccessToken(refresh_token);
//         if (res.data.code === 200) {
//           //새로운 액세스토큰 발급성공
//           console.log('Get New Access_Token');
//           const newAccessToken = res.data.data.accessTokenValue;
//           axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`; //새로 받은 액세스 토큰 헤더값에 추가
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           const reRes = await axios(originalRequest); //새로운 액세스 토큰으로 에러 요청을 재요청

//           if (res.data.code === 200) {
//             //재요청이 성공이면 반환
//             return resolve(reRes);
//           }
//         }
//       }
//       // logout(); //리프레쉬 토큰이 만료됐거나 올바른 값이 아닌 경우
//       // window.location.replace('/login'); //로그인 페이지로 이동
//       return reject(err);
//     });
//   },
// );

API.interceptors.response.use();

export default API;
