import { favouritesJSON } from '../../favourites.js'

export class FavouritesModel {
  static async getAll () {
    return favouritesJSON
  }

  static async save ({ input }) {
    favouritesJSON.push(input)

    return input
  }

  static async delete ({ id }) {
    const propertyIndex = favouritesJSON.findIndex((property) => property.id === id)
    if (propertyIndex === -1) return false

    favouritesJSON.splice(propertyIndex, 1)
    return true
  }
}
