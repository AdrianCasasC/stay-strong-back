import { Router } from 'express';
import { FilesController } from '../controllers/files.js';
import multer from 'multer';

export const filesRouter = Router();
const upload = multer({ dest: 'uploads/' });

filesRouter.post('/upload', upload.single('file'), FilesController.uploadFile);
