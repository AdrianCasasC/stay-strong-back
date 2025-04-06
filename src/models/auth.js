// import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

export class AuthModel {
  static async login (email) {
    try {
      const connection = await mysql.createConnection(connectionConfig)

      const [user] = await connection.query('SELECT * FROM user WHERE email = ?;', [email])

      if (!user.length) return { status: 404, error: 'User not found' }

      // const isPasswordValid = await bcrypt.compare(password, user[0].password);
      // const isPasswordValid = password === user[0].password;

      // if (!isPasswordValid) return { status: 401, error: 'Invalid credentials' };

      return { status: 200, userRole: user[0].role, email: user[0].email }
    } catch (error) {
      return { status: 500, error: 'Login failed' }
    }
  }

  static async register (userName, email) {
    try {
      const connection = await mysql.createConnection(connectionConfig)

      // const hashedPassword = await bcrypt.hash(password, 10);
      await connection.query('INSERT INTO user (id, email, role) VALUES (UUID_TO_BIN(UUID()), ?, "USER")', [
        email
        // hashedPassword,
      ])

      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_EMAIL,
          pass: process.env.ZOHO_PASSWORD
        }
      })

      transporter.verify((error) => {
        if (error) {
          console.error('SMTP connection error')
        } else {
          console.log('SMTP server is ready to take messages')
        }
      })

      // Email options
      const mailOptions = {
        from: 'contacto@orvelian.com',
        to: email,
        subject: '¡Registro satisfactorio!',
        html: `<h2>¡Bienvenido a Orvelian, <strong>${userName}</strong>!</h2><br><p>Nos emociona tenerte aquí. Has dado el primer paso hacia descubrir los inmuebles más exclusivos y de lujo del mercado.</p><br><p>Nuestra misión es ofrecerte una experiencia personalizada, ayudándote a encontrar propiedades excepcionales que se alineen con tus sueños y estilo de vida.</p><br><p>Explora nuestras colecciones de residencias premium, contacta con nuestros asesores expertos y haz realidad tus aspiraciones inmobiliarias. Si necesitas ayuda en cualquier momento, estamos a un solo clic de distancia.</p><br><strong style="margin-bottom: 12px; display: block;">¡Comencemos esta experiencia juntos!</strong><img src="https://images.ecestaticos.com/n6SMK4d174C6f-zLHOPViABQOk8=/0x0:1578x985/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4d0%2F939%2Fee9%2F4d0939ee986e6381943f1274043cf1e5.jpg" /><br><small>Calle de Don Ramón de la Cruz, 62, Salamanca, 28001 Madrid</small>`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(`Error: ${error.message}`)
        }
        console.log(`Email sent: ${info.response}`)
      })
      const [user] = await connection.query('SELECT * FROM user WHERE email = ?;', [email])
      return { status: 201, message: 'User registered successfully', email: user[0].email, role: user[0].role }
    } catch (error) {
      return { status: 500, error }
    }
  }
}
