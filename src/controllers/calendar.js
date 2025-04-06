import { CalendarModel } from '../models/calendar.js';

export class CalendarController {
	static async getAll(req, res) {
		const { year, month } = req.query;
		const calendar = await CalendarModel.getAll({ year, month });
		if (calendar) return res.json(calendar);
		res.status(404).json({ message: 'Calendar not found' });
	}

	static async getCurrPrevNext(req, res) {
		const { year, month } = req.query;
		const calendar = await CalendarModel.getCurrPrevNext({ year, month });
		if (calendar) return res.json(calendar);
		res.status(404).json({ message: 'Calendar prev, next not found' });
	}
}
