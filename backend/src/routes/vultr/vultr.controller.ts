import { RequestHandler } from 'express';
import { vultrFetch } from '@/src/lib/configured-fetch/fetch.client';
import { isFetchError } from '@/src/lib/configured-fetch/fetch.utils';

export const vultrGetController: RequestHandler = async (req, res) => {
  const stringifiedRequestQueries = Object.entries(req.query).reduce((agg, [key, value]) => {
    return `${agg}${agg && '&'}${key}=${value}`;
  }, '');
  const stringifiedPath = `${req.params[0]}?${stringifiedRequestQueries}`;
  try {
    const { data } = await vultrFetch.get(stringifiedPath);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    if (isFetchError(err)) {
      if (err.response?.data) {
        const errorResponseData = err.response.data as { error?: string, status?: number };
        return res
          .status(errorResponseData.status ?? 500)
          .send(errorResponseData.error ?? 'Internal server error - Fetch from Vultr failed');
      }
    }
    return res.status(500).send('Internal server error - Unknown error');
  }
};