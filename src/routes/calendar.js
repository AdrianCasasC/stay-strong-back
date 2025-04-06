import { Router } from 'express';
import { CalendarController } from '../controllers/calendar.js';

export const calendarRouter = Router();

calendarRouter.get('/', CalendarController.getAll);
calendarRouter.get('/prev-next', CalendarController.getCurrPrevNext);
