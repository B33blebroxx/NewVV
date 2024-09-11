import Router from 'next/router';
import { jwtDecode } from 'jwt-decode';
import client from './client';

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
    const token = localStorage.getItem('authToken');
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

const signIn = async (username, password) => {
  try {
    const response = await client.post('/auth/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('authToken', token); // Store the token in local storage
    return user;
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    throw error;
  }
};

const signOut = () => {
  localStorage.removeItem('authToken'); // Remove the token from local storage
  Router.push('/');
};

const checkTokenAndRedirect = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('You are not logged in.');
    window.location.href = '/';
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      alert('Session expired. Please log in again.');
      window.location.href = '/';
      return false;
    }
    return true;
  } catch (error) {
    alert('Invalid token. Please log in again.');
    window.location.href = '/';
    return false;
  }
};

export {
  signIn, signOut, checkUser, registerUser, checkTokenAndRedirect,
};
