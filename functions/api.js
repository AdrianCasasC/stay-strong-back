import express, { json } from 'express'
import serverless from 'serverless-http'
import { propertiesRouter } from '../src/routes/properties.js'
import { authRouter } from '../src/routes/auth.js'
import { corsMiddleware } from '../src/middlewares/cors.js'
// import { sessionMiddleware } from '../src/middlewares/session.js'
// import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { favouritesRouter } from '../src/routes/favourites.js'
import { userInfoRouter } from '../src/routes/user-info.js'

config()

const app = express()
// const port = process.env.PORT ?? 8080

app.use(json())
app.use(corsMiddleware())
// app.use(cookieParser())
app.disable('x-powered-by')

// app.use(sessionMiddleware)
app.use('/.netlify/functions/api/properties', propertiesRouter)
app.use('/.netlify/functions/api/user-info', userInfoRouter)
app.use('/.netlify/functions/api/auth', authRouter)
app.use('/api/favourites', favouritesRouter)
app.get('/.netlify/functions/api/user', (req, res) => {
  res.send(req.session.user)
})

// app.use('/.netlify/functions/app');
// app.listen(port, () => {
// console.log(`Server is running on http://localhost:${port}`);
// });
export const handler = serverless(app)
