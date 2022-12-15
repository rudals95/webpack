import { getCookie } from './cookie';

export const isAccessToken = () => getCookie('access_token'); //액세스토큰 반환
export const isRefreshToken = () => getCookie('refresh_token'); //액세스토큰 반환
