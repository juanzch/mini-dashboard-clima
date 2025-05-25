import Cookies from 'js-cookie';

const TOKEN_KEY = 'access_token';

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); 
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function clearToken() {
  Cookies.remove(TOKEN_KEY);
}