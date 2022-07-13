
import axios from 'axios';

const backendAuthority = (
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'localhost:4000'
    : process.env.BACKEND_AUTHORITY
);
const backendScheme = (
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'http'
    : 'https'
);

const backendAxios = axios.create({
  withCredentials: true,
  baseURL: `${backendScheme}://${backendAuthority}`
});

export default backendAxios;