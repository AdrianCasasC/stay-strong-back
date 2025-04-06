import { AuthModel } from '../models/auth.js'
// import { AuthModel } from '../mysql/auth.js';
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

const JWT_SECRET = process.env.JWT_SECRET

export class AuthController {
  static async login (req, res) {
    // const { email, password } = req.body;
    const { email } = req.body

    // const login = await AuthModel.login(email, password);
    const login = await AuthModel.login(email)
    if (login.status !== 200) {
      res.status(login.status).send({ error: login.error, status: login.status })
    } else {
      const token = jwt.sign({ email: login.email, role: login.userRole }, JWT_SECRET, { expiresIn: '1h' })

      res.status(200).send({ userRole: login.userRole, email: login.email, token })
    }
  }

  static async register (req, res) {
    // const { userName, email, password } = req.body;
    const { userName, email } = req.body

    // const register = await AuthModel.register(userName, email, password);
    const register = await AuthModel.register(userName, email)
    if (register.status === 201) {
      const token = jwt.sign({ email: register.email, role: register.role }, JWT_SECRET, { expiresIn: '1h' })
      res
        .status(register.status)
        .send({ message: register.message, user: { email: register.email, role: register.role, token } })
    } else {
      res.status(register.status).send({ error: register.error })
    }
  }

  // static async logout (req, res) {
  //   res.clearCookie('access_token', {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  //     domain: process.env.NODE_ENV === 'production' ? 'orvelian-back.netlify.app' : 'localhost'
  //   }).status(200).send({ message: 'logout success!' })
  // }
}
