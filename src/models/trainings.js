import Calendar from '../schemas/calendar.js';

export class TrainingModel {
	static async updateTraining(dayId, exercise) {
		try {
			const calendar = await Calendar.findOne({
				"days.id": dayId
			});
			if (calendar) {
				const day = calendar.days.find(day => day.id === dayId);
				day.exercises ? day.exercises.push(exercise) : day.exercises = [exercise];
				const result = await Calendar.updateOne(
					{
						"days.id": dayId
					},
					{
						$set: {
							"days.$": day
						}
					}
				);
				if (result.modifiedCount === 0) {
					return { status: 404, message: 'Day not found or already up to date.', day };
				}
				return { status: 200, message: 'Exercise added successfully', day };
			} else {
				return { status: 404, message: 'Day not found' };
			}
		} catch (err) {
			return { status: 500, message: "Error getting calendar day" };
		}
	}
}
