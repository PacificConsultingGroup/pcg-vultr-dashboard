import { RequestHandler } from 'express';
import vultrFetch, { isVultrFetchError } from '@/src/lib/configured-fetch/vultrFetch';

export const vultrGetController: RequestHandler = async (req, res) => {
  const stringifiedRequestQueries = Object.entries(req.query).reduce((agg, [key, value]) => {
    return `${agg}${agg && '&'}${key}=${value}`;
  }, '');
  const stringifiedPath = `${req.params[0]}?${stringifiedRequestQueries}`;
  try {
    const { data } = await vultrFetch.get(stringifiedPath);
    console.log(data);
  } catch (err) {
    console.log(err);
    if (isVultrFetchError(err)) {
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