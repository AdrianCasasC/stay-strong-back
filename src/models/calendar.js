import { calendarJSON } from '../../calendar.js';
import Calendar from '../schemas/calendar.js';

export class CalendarModel {
	static async getAll({ year, month }) {
		try {
			const calendarData = await Calendar.find();
			console.log("calendarData: ", calendarData);
			return calendarData;
		} catch (err) {
			return { status: 500, message: "Error retreiving all calendar data" };
		}
	}

	static async getDay(dayId) {
		try {
			const calendar = await Calendar.findOne({
				"days.id": dayId
			});
			if (calendar) {
				const day = calendar.days.find(day => day.id === dayId);
				return { status: 200, day };
			} else {
				return { status: 404, message: 'Day not found' };
			}
		} catch (err) {
			return { status: 500, message: "Error getting calendar day" };
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
				const day = calendar.days.find(day => day.id === dayId)
				if (result.modifiedCount === 0) {
					return { status: 404, message: 'Day not found or already up to date.', day };
				}
				console.log("Day updated!: ", updatedDay);
				return { status: 200, message: 'Calendar day updated successfully', day };
			}
			return { status: 404, message: 'Calendar not found.', day: updatedDay };

		} catch (err) {
			return { status: 500, message: 'Error creating calendar', error: err };
		}
	}

	static async addDay(year, month, updatedDay) {
		try {
			updatedDay["id"] = crypto.randomUUID()
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
				return { status: 404, message: 'Calendar not found.', day: updatedDay };
			}
			return { status: 200, message: 'Day added successfully.', day: updatedDay };

		} catch (err) {
			return { status: 500, message: 'Error creating calendar', error: err };
		}
	}

	static async getCurrPrevNext({ y, m }) {
		const monthTargets = [
			m === 1 ? { year: y - 1, month: 12 } : { year: y, month: m - 1 },
			{ year: y, month: m },
			m === 12 ? { year: y + 1, month: 1 } : { year: y, month: m + 1 }
		];
		try {
			const calendars = await Calendar.find({
				$or: monthTargets
			});
			const result = {
				previous: calendars.find(cal => cal.year === monthTargets[0].year && cal.month === monthTargets[0].month) || null,
				current: calendars.find(cal => cal.year === monthTargets[1].year && cal.month === monthTargets[1].month) || null,
				next: calendars.find(cal => cal.year === monthTargets[2].year && cal.month === monthTargets[2].month) || null
			};
			return { status: 200, calendars: result };
		} catch (err) {
			return { status: 500, message: 'Error getting current, previous, and next months' };
		}
	}
}
