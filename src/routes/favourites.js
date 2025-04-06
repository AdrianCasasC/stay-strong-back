import { Router } from 'express'

import { FavouritesController } from '../controllers/favourites.js'

export const favouritesRouter = Router()

favouritesRouter.get('/', FavouritesController.getAll)
favouritesRouter.post('/save', FavouritesController.save)
favouritesRouter.delete('/delete/:id', FavouritesController.delete)
