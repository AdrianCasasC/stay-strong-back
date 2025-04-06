import { Router } from 'express';

import { PropertyController } from '../controllers/properties.js';

export const propertiesRouter = Router();

propertiesRouter.get('/', PropertyController.getAll);
propertiesRouter.get('/slider', PropertyController.getAllSlider);
propertiesRouter.get('/:id', PropertyController.getById);
propertiesRouter.post('/', PropertyController.create);
propertiesRouter.patch('/:id', PropertyController.update);
propertiesRouter.delete('/:id', PropertyController.delete);
