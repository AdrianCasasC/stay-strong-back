import { TrainingModel } from '../models/trainings.js';

export class TrainingController {
	static async editTraining(req, res) {
		const { dayId } = req.params;
		const exercise = req.body;
		const dayResponse = await TrainingModel.updateTraining(dayId, exercise);
		if (dayResponse.status === 200) {
			res.status(dayResponse.status).json(dayResponse.day);
		} else {
			res.status(dayResponse.status).send({ error: dayResponse.message });
		}
	}
}
