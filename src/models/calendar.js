import { calendarJSON } from '../../calendar.js';

export class CalendarModel {
	static async getAll({ year, month }) {
		const foundDayDetails = calendarJSON.find((calendar) => calendar.year === year && calendar.month === month);
		if (!foundDayDetails) return [];
		return foundDayDetails;
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
