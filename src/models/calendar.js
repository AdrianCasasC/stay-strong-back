import { calendarJSON } from '../../calendar.js';
import Calendar from '../schemas/calendar.js';

export class CalendarModel {
	static async getAll({ year, month }) {
		try {
			const calendarData = await Calendar.find();
			console.log("calendarData: ", calendarData);
			return calendarData;
		} catch (err) {
			return [{ error: err }];
		}
	}

	static async getDay(dayId) {
		try {
			const calendarData = await Calendar.find();
			console.log("calendarData: ", calendarData);
			return calendarData;
		} catch (err) {
			return [{ error: err }];
		}
	}

	static async create(req, res) {
		try {
			const calendarData = req.body;
			const calendar = new Calendar(calendarData);
			await calendar.save();
			return { status: 201, message: 'Calendar created successfully', calendar };
		} catch (err) {
			return { status: 500, message: 'Error creating calendar', error: err };
		}
	}

	static async updateDay(year, month, dayId, updatedDay) {
		try {
			const calendar = await Calendar.findOne({
				year: Number(year),
				month: Number(month),
				"days.id": dayId
			});
			if (calendar) {
				const result = await Calendar.updateOne(
					{
						year: Number(year),
						month: Number(month),
						"days.id": dayId
					},
					{
						$set: {
							"days.$": updatedDay
						}
					}
				);
				if (result.modifiedCount === 0) {
					return { status: 404, message: 'Day not found or already up to date.', calendar };
				}
				return { status: 200, message: 'Calendar day updated successfully', calendar };
			} else {
				const result = await Calendar.updateOne(
					{
						year: Number(year),
						month: Number(month)
					},
					{
						$push: { days: updatedDay }
					}
				);
				if (result.matchedCount === 0) {
					return { status: 404, message: 'Calendar not found.' };
				}

				return { status: 200, message: 'Day added successfully.' };
			}

		} catch (err) {
			return { status: 500, message: 'Error creating calendar', error: err };
		}
	}

	static async getCurrPrevNext({ year, month }) {
		const prevYear = month === 1 ? parseInt(year) - 1 : parseInt(year);
		const prevMonth = month === 1 ? 12 : parseInt(month) - 1;
		const nextYear = month === 12 ? parseInt(year) + 1 : parseInt(year);
		const nextMonth = month === 12 ? 1 : parseInt(month) + 1;
		const foundDayDetails = calendarJSON.filter((calendar) =>
			(calendar.year === parseInt(year) && calendar.month === parseInt(month)) ||
			(calendar.year === prevYear && calendar.month === prevMonth) ||
			(calendar.year === nextYear && calendar.month === nextMonth));
		if (!foundDayDetails) return [];
		return foundDayDetails;
	}
}
