import cors from 'cors';

const ACCEPTED_ORIGINS = [
	'http://localhost:4200',
	'https://4200-idx-stay-strong-front-1744357542758.cluster-blu4edcrfnajktuztkjzgyxzek.cloudworkstations.dev',
	'https://stay-strong-back.netlify.app/.netlify/functions/api',
	'https://stay-strong-front.netlify.app', // Cambiar por url de PRO
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: (origin, callback) => {
			if (acceptedOrigins.includes(origin)) {
				return callback(null, true);
			}

			if (!origin) {
				return callback(null, true);
			}

			return callback(new Error('Not allowed by CORS'));
		},
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	});
