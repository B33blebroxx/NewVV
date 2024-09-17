import Router from 'next/router';
import { jwtDecode } from 'jwt-decode';
import client from './client';

const AUTH_TOKEN_KEY = 'authToken';

const registerUser = async (userInfo) => {
  try {
    const response = await client.post('/auth/register', userInfo);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
};

const checkUser = async () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      return { isLoggedIn: false };
    }

    const response = await client.get('/auth/check', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error checking login status:', error.message);
    return { isLoggedIn: false };
  }
};

const signIn = async (email, password) => {
  try {
    const response = await client.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return user;
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    throw error;
  }
};

const signOut = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  Router.push('/');
};

const checkTokenAndRedirect = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    alert('You are not logged in.');
    Router.push('/');
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem(AUTH_TOKEN_KEY);
      Router.push('/');
      return false;
    }
    return true;
  } catch (error) {
    alert('Invalid token. Please log in again.');
    localStorage.removeItem(AUTH_TOKEN_KEY);
    Router.push('/');
    return false;
  }
};

const checkTokenOnInitialVisit = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token is expired, remove it and refresh the page
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  } catch (error) {
    console.error('Invalid token:', error.message);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export {
  signIn, signOut, checkUser, registerUser, checkTokenAndRedirect, checkTokenOnInitialVisit,
};
