import axios from 'axios';

import { BACKEND_URL } from './consts';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosInstance;
