import { createFetchClient } from '@/src/lib/fetch/fetch.utils';

if (!process.env.VULTR_API_KEY) throw new Error('VULTR_API_KEY is not found in process.env');

const vultrFetchClient = createFetchClient({
  headers: {
    Authorization: `Bearer ${process.env.VULTR_API_KEY}`
  },
  baseURL: 'https://api.vultr.com/v2/'
});

export default vultrFetchClient;