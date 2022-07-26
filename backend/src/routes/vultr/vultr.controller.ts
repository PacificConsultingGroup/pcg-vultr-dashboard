import { RequestHandler } from 'express';
import vultrFetchClient from '@/src/fetch-clients/vultrFetchClient';
import { isFetchError, parseFetchError } from '@/src/lib/fetch/fetch.utils';
import baseLogger from '@/src/loggers/baseLogger';

export const vultrGetController: RequestHandler = async (req, res) => {
  const stringifiedRequestQueries = Object.entries(req.query).reduce((agg, [key, value]) => {
    return `${agg}${agg && '&'}${key}=${value}`;
  }, '');
  const stringifiedPath = `${req.params[0]}?${stringifiedRequestQueries}`;
  try {
    const { data } = await vultrFetchClient.get(stringifiedPath);
    return res.status(200).send(data);
  } catch (err) {
    baseLogger.error(err);
    if (isFetchError(err)) {
      const { status, message } = parseFetchError(err);
      return res.status(status ?? 500).send(message ?? 'Internal server error - Fetch from Vultr failed');
    }
    return res.status(500).send('Internal server error - Unknown error');
  }
};