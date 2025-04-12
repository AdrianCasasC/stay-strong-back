import { Router } from 'express';
import { CalendarController } from '../controllers/calendar.js';

export const calendarRouter = Router();

calendarRouter.get('/', CalendarController.getAll);
calendarRouter.post('/', CalendarController.create);
calendarRouter.get('/day/:dayId', CalendarController.getDay);
calendarRouter.post('/update-day/:year/:month/:dayId', CalendarController.updateDay);
calendarRouter.get('/prev-next', CalendarController.getCurrPrevNext);
