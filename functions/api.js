import express, { json } from 'express';
import serverless from 'serverless-http';
import { corsMiddleware } from '../src/middlewares/cors.js';
import { config } from 'dotenv';
import { dayDetailsRouter } from '../src/routes/day-details.js';
import { calendarRouter } from '../src/routes/calendar.js';

config();

const app = express();

app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/.netlify/functions/api/day-details', dayDetailsRouter);
app.use('/.netlify/functions/api/calendar', calendarRouter);

export const handler = serverless(app);
