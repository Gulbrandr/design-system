import { rest } from 'msw';
import PeopleService from './services/people';
export const handlers = [
  rest.get('/people', (req, res, ctx) => {
    console.log('mocks/handlers.ts: handlers: rest.get: req', req);
    const data = PeopleService.getPeople();
    return res(ctx.status(200), ctx.json(data));
  }),
];
