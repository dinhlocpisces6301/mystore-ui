import Cookies from 'js-cookie';

import { httpRequest } from '~/utils';
import jwtDecode from 'jwt-decode';

export const OTPlogin = async (user) => {
  try {
    const res = await httpRequest.post('Users/authenticate', user);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const login = async (user) => {
  try {
    const res = await httpRequest.post('Users/admin-authenticate', user);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    return { message: error.response.data.message, isSuccess: false };
  }
};

export const logout = () => {
  Cookies.remove('jwt');
  Cookies.remove('user-id');
};

export const isLoggedIn = () => {
  const jwt = Cookies.get('jwt');
  const userId = Cookies.get('user-id');
  if (jwt === undefined || userId === undefined) {
    Cookies.remove('jwt');
    Cookies.remove('user-id');
    return false;
  }

  try {
    const jwt_decode = jwtDecode(jwt);
    if (jwt_decode.NameIdentifier === userId) {
      return true;
    } else {
      Cookies.remove('jwt');
      Cookies.remove('user-id');
      return false;
    }
  } catch (error) {
    Cookies.remove('jwt');
    Cookies.remove('user-id');
    console.log(error);
    return false;
  }
};

export const register = async (account) => {
  try {
    const res = await httpRequest.post('Users/register', account);
    return res.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data.message, isSuccess: false };
  }
};

// OTP

export const OTPCheck = async (user) => {
  try {
    const res = await httpRequest.get(`TOTP/OTP-check?UserName=${user.userName}&Password=${user.password}`);
    return res;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return false;
    }
    return false;
  }
};

export const GetQR = async (user) => {
  try {
    const jwt_token = Cookies.get('jwt');
    const res = await httpRequest.get(`TOTP/qr-code-image?UserName=${user.userName}&Password=${user.password}`, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
      responseType: 'blob',
    });
    return res;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return false;
    }
    return false;
  }
};

export const OTPTurnOn = async (user) => {
  const jwt_token = Cookies.get('jwt');

  try {
    const res = await httpRequest.get(`TOTP/OTP-on?Email=${user.email}&Password=${user.password}`, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return false;
    }
    return false;
  }
};

export const OTPTurnOff = async (user) => {
  const jwt_token = Cookies.get('jwt');

  try {
    const res = await httpRequest.get(`TOTP/OTP-off?Email=${user.email}&Password=${user.password}`, {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    return res;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return false;
    }
    return false;
  }
};
