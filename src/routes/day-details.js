import { Router } from 'express';
import { DayDetailsController } from '../controllers/day-details.js';

export const dayDetailsRouter = Router();

dayDetailsRouter.get('/:id', DayDetailsController.getById);
