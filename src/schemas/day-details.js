import z from 'zod'

// const movieSchema = z.object({
//   title: z.string({
//     invalid_type_error: 'Movie title must be a string',
//     required_error: 'Movie title is required.'
//   }),
//   year: z.number().int().min(1900).max(2024),
//   director: z.string(),
//   duration: z.number().int().positive(),
//   rate: z.number().min(0).max(10).default(5),
//   poster: z.string().url({
//     message: 'Poster must be a valid URL'
//   }),
//   genre: z.array(
//     z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
//     {
//       required_error: 'Movie genre is required.',
//       invalid_type_error: 'Movie genre must be an array of enum Genre'
//     }
//   )
// })

const propertySchema = z.object({
  name: z.string({
    invalid_type_error: 'Property name must be a string',
    required_error: 'Property name is required.'
  }),
  description: z.string({
    invalid_type_error: 'Property description must be a string',
    required_error: 'Property description is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  price: z.number().int().positive(),
  imageURL: z.string().url({
    message: 'Image must be a valid URL',
    required_error: 'Property image is required.'
  })
})

export function validateProperty (input) {
  return propertySchema.safeParse(input)
}

export function validatePartialProperty (input) {
  return propertySchema.partial().safeParse(input)
}
