import { Router } from 'express';
import { CalendarController } from '../controllers/calendar.js';
import { TrainingController } from '../controllers/trainings.js';

export const calendarRouter = Router();

calendarRouter.get('/', CalendarController.getAll);
calendarRouter.post('/', CalendarController.create);
calendarRouter.get('/day-detail/:dayId', CalendarController.getDay);
calendarRouter.put('/day-detail/training/:dayId', TrainingController.editTraining);
calendarRouter.put('/update-day/:year/:month/:dayId', CalendarController.updateDay);
calendarRouter.post('/update-day/:year/:month', CalendarController.addDay);
calendarRouter.get('/prev-next', CalendarController.getCurrPrevNext);
calendarRouter.get('/corporal-weight', CalendarController.getCorporalWeight);
