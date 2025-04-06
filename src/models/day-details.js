import { dayDetailsJSON } from '../../day-details.js';

export class DayDetailsModel {
	static async getById({ id }) {
		const foundDayDetails = dayDetailsJSON.find((dayDetail) => dayDetail.id === id);
		return foundDayDetails;
	}
}
