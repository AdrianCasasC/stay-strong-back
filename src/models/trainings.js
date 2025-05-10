import Calendar from '../schemas/calendar.js';

export class TrainingModel {
	static async updateTraining(dayId, exercises) {
		
		try {
			const result = await Calendar.updateOne(
			{ "days.id": dayId },
			{
				$set: {
				"days.$[day].exercises": exercises
				}
			},
			{
				arrayFilters: [{ "day.id": dayId }]
			}
			);

			if (result.modifiedCount === 0) {
				return { status: 404, message: 'Day not found or already up to date.' };
			}

			const calendar = await Calendar.findOne({
						"days.id": dayId
					});
			if (calendar) {
				const day = calendar.days.find(day => day.id === dayId);
				return { status: 200, day };
			}
			return { status: 404, message: 'Updated day not found' };
		} catch (err) {
			return { status: 500, message: "Internal server error" };
		}
	}

}
