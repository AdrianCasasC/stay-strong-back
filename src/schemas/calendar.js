import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  steps: Boolean,
  calories: Boolean,
  training: Boolean,
  supplementation: Boolean,
  weight: Boolean,
}, { _id: false });

const daySchema = new mongoose.Schema({
  id: String,
  date: String,
  tasks: taskSchema,
}, { _id: false });

const calendarSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  days: [daySchema],
});

// Explicitly connect to 'calendars' collection in 'expense_tracker' DB
const Calendar = mongoose.model('Calendar', calendarSchema, 'calendars');

export default Calendar;
