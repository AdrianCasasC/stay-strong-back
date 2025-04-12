import express, { json } from 'express';
import { dayDetailsRouter } from './src/routes/day-details.js';
import { corsMiddleware } from './src/middlewares/cors.js';
import { config } from 'dotenv';
import { calendarRouter } from './src/routes/calendar.js';
import mongoose from 'mongoose';

config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

const mongoUri = process.env.MONGO_URI || Netlify.env.get('MONGO_URI');

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'expense_tracker'
})
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/day-details', dayDetailsRouter);
app.use('/api/calendar', calendarRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
