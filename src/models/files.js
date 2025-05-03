import Calendar from '../schemas/calendar.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import Tesseract from 'tesseract.js';
import { spawn  } from 'child_process';
import { response } from 'express';

function extractPdfTables(pdfPath) {
	return new Promise((resolve, reject) => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
	  const scriptPath = path.join(__dirname, 'extract_table.py');
	  const pythonProcess = spawn('python3', [scriptPath, pdfPath]);
      console.log("scriptPath: ", scriptPath);
	  console.log("pdfPath: ", pdfPath);
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
		  resolve(JSON.parse(result));
		} catch (e) {
		  reject(new Error('Invalid JSON from Python script'));
		}
	  });
	});
  }

export class FilesModel {
	static async uploadFile(file) {
		console.log("file: ", file);
		const pdfPath = file.path; // The path to the uploaded file
		console.log("pdfPath: ", pdfPath);
		extractPdfTables(pdfPath)
			.then((data) => {
			// Clean up the temporary uploaded file after extraction
			fs.unlinkSync(pdfPath);
			return { status: 500, jsonFile: data }
			})
			.catch((err) => {
			// Clean up on error as well
			fs.unlinkSync(pdfPath);
			return { status: 500, message: err.message };
			});

		/* const outputPath = `${file.path}.json`;
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const tabulaJarPath = path.join(__dirname, 'lib', 'tabula.jar');

		// Tabula command to extract tables to JSON
		const command = `java -jar ${tabulaJarPath} --format JSON -p all ${file.path} > ${outputPath}`;
		let response = {status: 500, message: 'Failed to extract table'};
		console.log("outputPath: ", outputPath);
		console.log("tabulaJarPath: ", tabulaJarPath);
		console.log("command: ", command); */

		/* execSync(command, (error) => {
			if (error) {
				console.error('Tabula error:', error);
				response = { status: 500, message: 'Failed to extract tables' }
			}
		
			console.log('Tabula command executed successfully');
			const json = fs.readFileSync(outputPath, 'utf8');
			fs.unlinkSync(file.path);        // cleanup PDF
			fs.unlinkSync(outputPath);       // cleanup JSON
		
			try {
				const tables = JSON.parse(json);
				response = { status: 201, jsonFile: tables };
			} catch (parseErr) {
				console.error('JSON parse error:', parseErr);
				response = { status: 400, message: 'Failed to parse table data' };
			}
		}); */

		/* let stdout = execSync(command);
		json = JSON.parse(stdout);
		console.log("json: ", json);
		return { status: 201, jsonFile: json }; */
		/* try {

			

			const ext = path.extname(file.originalname).toLowerCase();
			console.log("ext: ", ext);
			if (ext === '.pdf') {
			const dataBuffer = fs.readFileSync(file.path);
			const data = await pdfParse(dataBuffer);

			// Simple parsing of text into lines
			const lines = data.text.split('\n').filter(line => line.trim());
			const json = lines.map(line => ({ row: line }));

			return { status: 201, jsonFile: json };
			} else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
			const result = await Tesseract.recognize(file.path, 'eng');
			const lines = result.data.text.split('\n').filter(line => line.trim());
			const json = lines.map(line => ({ row: line }));

			return { status: 201, jsonFile: json };
			} else {
				return { status: 400, message: 'Unsupported file type' };
			}
		} catch (err) {
			console.error(err);
			return { status: 500, message: 'Processing failed' };
		} finally {
			fs.unlinkSync(file.path); // Clean up
		} */
	}
}
