import { PropertyModel } from '../models/property.js';
import { validateProperty, validatePartialProperty } from '../schemas/property.js';

export class PropertyController {
	static async getAll(req, res) {
		// const { genre } = req.query
		const properties = await PropertyModel.getAll();
		res.json(properties);
	}

	static async getAllSlider(req, res) {
		// const { genre } = req.query
		const properties = await PropertyModel.getAllSlider();
		res.json(properties);
	}

	static async getById(req, res) {
		const { id } = req.params;
		const property = await PropertyModel.getById({ id });
		if (property) return res.json(property);
		res.status(404).json({ message: 'Property not found' });
	}

	static async create(req, res) {
		const result = validateProperty(req.body);

		if (!result.success) {
			// 422 Unprocessable Entity
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const newProperty = await PropertyModel.create({ input: result.data });

		res.status(201).json(newProperty);
	}

	static async delete(req, res) {
		const { id } = req.params;

		const result = await PropertyModel.delete({ id });

		if (!result) {
			return res.status(404).json({ message: 'Property not found' });
		}

		return res.json({ message: 'Property deleted' });
	}

	static async update(req, res) {
		const result = validatePartialProperty(req.body);
		const { id } = req.params;

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const updatedProperty = await PropertyModel.update({ id, input: result.data });

		return res.json(updatedProperty);
	}
}
