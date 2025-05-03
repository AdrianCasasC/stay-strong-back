import express, { json } from 'express';
import { dayDetailsRouter } from './src/routes/day-details.js';
import { corsMiddleware } from './src/middlewares/cors.js';
import { config } from 'dotenv';
import { calendarRouter } from './src/routes/calendar.js';
import { filesRouter } from './src/routes/files.js';
import mongoose from 'mongoose';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';

config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(json());
app.use(corsMiddleware());
//app.use('/api/files', express.raw({ type: 'application/pdf', limit: '10mb' }));
app.disable('x-powered-by');

const upload = multer({ dest: 'uploads/' });

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: process.env.MONGO_DB_NAME
})
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/day-details', dayDetailsRouter);
app.use('/api/calendar', calendarRouter);
//app.use('/api/files', filesRouter);

app.post('/api/training/table-data', upload.single('file'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' });
	}

	const pdfPath = req.file.path; // The path to the uploaded file

	extractPdfTables(pdfPath)
		.then((data) => {
			// Clean up the temporary uploaded file after extraction
			fs.unlinkSync(pdfPath);
			res.json(data);
		})
		.catch((err) => {
			// Clean up on error as well
			fs.unlinkSync(pdfPath);
			res.status(500).json({ error: err.message });
		});
});

function extractPdfTables(pdfPath) {
	return new Promise((resolve, reject) => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const scriptPath = path.join(__dirname, 'extract_table.py');
		console.log("scriptPath: ", scriptPath);
		const pythonProcess = spawn('C:\\Personal\\Repositories\\stay-strong-back\\venv\\Scripts\\python.exe', [scriptPath, pdfPath]);

		let result = '';
		let error = '';

		pythonProcess.stdout.on('data', (data) => {
			result += data.toString();
		});

		pythonProcess.stderr.on('data', (data) => {
			error += data.toString();
		});

		pythonProcess.on('close', (code) => {
			if (code !== 0 || error) {
				return reject(new Error(error || 'Failed to extract PDF'));
			}
			try {
				console.log("result: ", result);
				result = result.replace(/^"""/, '').replace(/"""$/, '');

				// Step 3: Replace `NaN` with `null` and ensure any undefined identifiers don't break JSON parsing
				result = result.replace(/\bNaN\b/g, 'null');

				// Step 4: Handle multiline string (if the string includes actual line breaks, fix them)
				result = result.replace(/\r?\n|\r/g, '\\n');
				console.log("Cleaned result: ", result);
				resolve(JSON.parse(result));
			} catch (e) {
				reject(new Error('Invalid JSON from Python script'));
			}
		});
	});
}


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
