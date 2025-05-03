import { FilesModel } from '../models/files.js';


export class FilesController {

	static async uploadFile(req, res) {
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}

		const fileResponse = await FilesModel.uploadFile(req.file);
		console.log("fileResponse: ", fileResponse);
		if (fileResponse.status !== 201) {
			return res.status(fileResponse.status).json({ error: fileResponse.message });
		}
		res.status(fileResponse.status).json(fileResponse.jsonFile);
	}

	
}
