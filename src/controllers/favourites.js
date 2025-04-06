import { FavouritesModel } from '../models/favourites.js'
// import { validateProperty } from '../schemas/property.js'

export class FavouritesController {
  static async getAll (req, res) {
    // const { genre } = req.query
    const properties = await FavouritesModel.getAll()
    res.json(properties)
  }

  static async save (req, res) {
    // const result = validateProperty(req.body)

    // if (!result.success) {
    //   return res.status(400).json({ error: JSON.parse(result.error.message) })
    // }

    const newProperty = await FavouritesModel.save({ input: req.body })

    res.status(201).json(newProperty)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await FavouritesModel.delete({ id })

    if (!result) {
      return res.status(404).json({ message: 'Favourite property not found' })
    }

    return res.json({ message: 'Favourite property deleted' })
  }
}
