// import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stringify } from 'uuid';

config();

const connectionConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

const USERS_FILE = path.join(process.cwd(), 'users-info.js');

export class UserInfoModel {
	static async saveInfoUser(name, lastName, email, phoneNumber, message, emailInfo) {
		try {
			const connection = await mysql.createConnection(connectionConfig);

			// Persistir datos en base de datos
			// const hashedPassword = await bcrypt.hash(password, 10);
			await connection.query(
				'INSERT INTO userinfo (id, name, lastName, email, phoneNumber, message, emailInfo) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?)',
				[
					name,
					lastName,
					email,
					phoneNumber ? phoneNumber.toString() : '',
					message || '',
					emailInfo,
					// hashedPassword,
				]
			);

			const [userInfo] = await connection.query('SELECT * FROM userinfo WHERE email = ?;', [email]);

			const users = await readUsers();

			// Verificar si el usuario ya existe
			if (users.some((user) => user.email === email)) {
				return res.status(400).json({ message: 'El usuario ya está registrado' });
			}

			// Crear un nuevo usuario
			const newUser = { id: stringify(Buffer.from(userInfo[0].id)), name, lastName, email, phoneNumber, message, emailInfo };
			users.push(newUser);

			// Guardar en el archivo
			await writeUsers(users);

			const transporter = nodemailer.createTransport({
				host: 'smtp.zoho.eu',
				port: 465,
				secure: true,
				auth: {
					user: process.env.ZOHO_EMAIL,
					pass: process.env.ZOHO_PASSWORD,
				},
			});

			transporter.verify((error) => {
				if (error) {
					console.error('SMTP connection error');
				} else {
					console.log('SMTP server is ready to take messages');
				}
			});

			// Email options
			const mailOptions = {
				from: 'contacto@orvelian.com',
				to: email,
				subject: '¡Registro satisfactorio!',
				html: `<h2>¡Bienvenido a Orvelian, <strong>${name} ${lastName}</strong>!</h2><br><p>Nos emociona tenerte aquí. Has dado el primer paso hacia descubrir los inmuebles más exclusivos y de lujo del mercado.</p><br><p>Nuestra misión es ofrecerte una experiencia personalizada, ayudándote a encontrar propiedades excepcionales que se alineen con tus sueños y estilo de vida.</p><br><p>Explora nuestras colecciones de residencias premium, contacta con nuestros asesores expertos y haz realidad tus aspiraciones inmobiliarias. Si necesitas ayuda en cualquier momento, estamos a un solo clic de distancia.</p><br><strong style="margin-bottom: 12px; display: block;">¡Comencemos esta experiencia juntos!</strong><img src="https://images.ecestaticos.com/n6SMK4d174C6f-zLHOPViABQOk8=/0x0:1578x985/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4d0%2F939%2Fee9%2F4d0939ee986e6381943f1274043cf1e5.jpg" /><br><small>Calle de Don Ramón de la Cruz, 62, Salamanca, 28001 Madrid</small>`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.error(`Error: ${error.message}`);
				}
				console.log(`Email sent: ${info.response}`);
			});

			if (!userInfo) {
				res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
			}
			return {
				status: 201,
				message: 'User information registered successfully',
				name: userInfo[0].name,
				email: userInfo[0].email,
			};
		} catch (error) {
			console.log('Error: ', error);
			return { status: 500, error };
		}
	}

	static async saveInfoUserMocked(name, lastName, email, phoneNumber, message, emailInfo) {
		return {
			status: 201,
			message: 'User information registered successfully',
			name,
			lastName,
			email,
			phoneNumber,
			message,
			emailInfo,
		};
	}
}

async function ensureFileExists() {
	try {
		await fs.access(USERS_FILE);
	} catch {
		await fs.writeFile(USERS_FILE, '[]', 'utf8'); // Si no existe, lo crea con un array vacío
	}
}

// Función para leer usuarios del archivo
async function readUsers() {
	await ensureFileExists();
	const data = await fs.readFile(USERS_FILE, 'utf8');
	return JSON.parse(data);
}

// Función para escribir en el archivo
async function writeUsers(users) {
	await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}
