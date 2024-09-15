import axios from 'axios';

const apiBaseURL = 'https://localhost:7067'; // Update this to your backend's base URL if necessary

const client = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default client;
