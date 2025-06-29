import Cookies from 'universal-cookie';
const cookie = new Cookies();

export const getCurrentAccessToken = (): string => {
  const token = cookie.get('accessToken');
  return typeof token === 'string' ? token : '';
};
