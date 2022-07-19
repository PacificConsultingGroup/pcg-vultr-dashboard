import axios from 'axios';

if (!process.env.VULTR_API_KEY) throw new Error('VULTR_API_KEY is not found in process.env');

export const vultrFetch = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.VULTR_API_KEY}`
  },
  baseURL: 'https://api.vultr.com/v2/'
});
