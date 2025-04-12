import { CalendarModel } from '../models/calendar.js';
import Calendar from '../schemas/calendar.js';

export class CalendarController {
	static async getAll(req, res) {
		const { year, month } = req.query;
		const calendar = await CalendarModel.getAll({ year, month });
		if (calendar) return res.json(calendar);
		res.status(404).json({ message: 'Calendar not found' });
	}

	static async getDay(req, res) {
		const { dayId } = req.params;
		const dayResponse = await CalendarModel.getDay(dayId);
		if (dayResponse.status === 200) {
			res.status(dayResponse.status).json(dayResponse);
		} else {
			res.status(dayResponse.status).send({ error: dayResponse.message });
		}
	}

	static async create(req, res) {
		const calendar = await CalendarModel.create(req, res);
		if (calendar.status === 201) {
			res.status(calendar.status).json(calendar);
		} else {
			res.status(calendar.status).send({ message: calendar.message, error: calendar.error });
		}
	}

	static async updateDay(req, res) {
		const { year, month, dayId } = req.params;
		const updatedDay = req.body;

		if (!year || !month || !dayId) {
			return res.status(400).json({ error: 'Missing year, month, or dayId query parameter.' });
		}
		const result = await CalendarModel.updateDay(year, month, dayId, updatedDay);
		if (result.status === 200) {
			return res.status(result.status).json(result);
		}
		res.status(result.status).send({ error: result.message });

	}

	static async getCurrPrevNext(req, res) {
		const { year, month } = req.query;

		if (!year || !month) {
			return res.status(400).json({ error: 'Missing query parameters: year and month are required.' });
		}

		const y = Number(year);
		const m = Number(month);

		const calendar = await CalendarModel.getCurrPrevNext({ y, m });
		if (calendar.status === 200) return res.json(calendar);
		res.status(404).json({ message: 'Calendar prev, next not found' });
	}
}
