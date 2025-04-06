import { DayDetailsModel } from '../models/day-details.js';

export class DayDetailsController {
	static async getById(req, res) {
		const { id } = req.params;
		const dayDetails = await DayDetailsModel.getById({ id });
		if (dayDetails) return res.json(dayDetails);
		res.status(404).json({ message: 'Day details not found' });
	}
}
