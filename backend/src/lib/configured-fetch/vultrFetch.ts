import axios from 'axios';

const vultrFetch = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.VULTR_API_KEY}`
  },
  baseURL: 'https://api.vultr.com/v2/'
});

export const isVultrFetchError = axios.isAxiosError;

export default vultrFetch;