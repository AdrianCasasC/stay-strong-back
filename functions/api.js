import express, { json } from 'express';
import serverless from 'serverless-http';
import { corsMiddleware } from '../src/middlewares/cors.js';
import { config } from 'dotenv';
import { dayDetailsRouter } from '../src/routes/day-details.js';
import { calendarRouter } from '../src/routes/calendar.js';
import mongoose from 'mongoose';

config();

const app = express();

app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://expense-tracker:Ls94f0gBap8PcRmr@cluster0.likmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect('mongodb+srv://expense-tracker:Ls94f0gBap8PcRmr@cluster0.likmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'expense_tracker'
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/.netlify/functions/api/day-details', dayDetailsRouter);
app.use('/.netlify/functions/api/calendar', calendarRouter);

export const handler = serverless(app);
