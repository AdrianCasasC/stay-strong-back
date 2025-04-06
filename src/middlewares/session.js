import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export const sessionMiddleware = (req, res, next) => {
  const excludedRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/.netlify/functions/api/auth/login',
    '/.netlify/functions/api/auth/register'
  ]
  req.session = { user: null }

  if (excludedRoutes.includes(req.path)) {
    return next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      if (req.path === '/api/user' || req.path === '/.netlify/functions/api/user') {
        return res.send({ user: null })
      }
      return res.status(403).send({ status: 403, message: 'Access not authorized' })
    }
    const data = jwt.verify(token, process.env.JWT_SECRET)
    if (!data) {
      return res.status(403).send({ status: 403, message: 'Access not authorized' })
    }
    req.session.user = data
  } catch {}

  next()
}
