import { Router } from 'express';

import { UserInfoController } from '../controllers/user-info.js';

export const userInfoRouter = Router();

userInfoRouter.post('/', UserInfoController.saveUserInfo);
