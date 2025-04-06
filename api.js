import express, { json } from 'express';
import { dayDetailsRouter } from './src/routes/day-details.js';
import { corsMiddleware } from './src/middlewares/cors.js';
import { config } from 'dotenv';
import { calendarRouter } from './src/routes/calendar.js';

config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/api/day-details', dayDetailsRouter);
app.use('/api/calendar', calendarRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
