import { Router } from 'express';
import { CalendarController } from '../controllers/calendar.js';

export const calendarRouter = Router();

calendarRouter.get('/', CalendarController.getAll);
calendarRouter.post('/', CalendarController.create);
calendarRouter.get('/day-detail/:dayId', CalendarController.getDay);
calendarRouter.put('/update-day/:year/:month/:dayId', CalendarController.updateDay);
calendarRouter.post('/update-day/:year/:month', CalendarController.addDay);
calendarRouter.get('/prev-next', CalendarController.getCurrPrevNext);
calendarRouter.get('/corporal-weight', CalendarController.getCorporalWeight);
