import { UserInfoModel } from '../models/user-info.js';

export class UserInfoController {
	static async saveUserInfo(req, res) {
		const { name, lastName, email, phoneNumber, message, emailInfo } = req.body;

		const userInfo = await UserInfoModel.saveInfoUser(name, lastName, email, phoneNumber, message, emailInfo);
		if (userInfo.status === 201) {
			res.status(userInfo.status).send({
				message: userInfo.message,
				userInfo: {
					name: userInfo.name,
					lastName: userInfo.lastName,
					email: userInfo.email,
					phoneNumber: userInfo.phoneNumber,
					message: userInfo.message,
					emailInfo: userInfo.emailInfo,
				},
			});
		} else {
			res.status(userInfo.status).send({ error: userInfo.error });
		}
	}
}
