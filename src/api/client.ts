import axios from 'axios';

const client = axios.create({
  baseURL: 'https://dev.bhcjobs.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;