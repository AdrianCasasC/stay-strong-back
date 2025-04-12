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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'expense_tracker'
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/.netlify/functions/api/day-details', dayDetailsRouter);
app.use('/.netlify/functions/api/calendar', calendarRouter);

export const handler = serverless(app);
