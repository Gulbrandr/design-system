import { NextApiRequest, NextApiResponse } from 'next';
import { people } from '@/mocks/services/people';
import NextCors from 'nextjs-cors';

export const services = {
  people,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const query = req.query;
    const service = query.service as keyof typeof services;
    const data = services[service]();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
