import { randomUUID } from 'node:crypto';
import { homePropertiesSlider, propertiesJSON } from '../../properties.js';
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryProperties } from '../../cloudinaryProperties.js';

config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

let propertiesImagesJSON = [];

export class PropertyModel {
	static async getAll() {
		if (propertiesImagesJSON && propertiesImagesJSON.length) return propertiesImagesJSON;
		try {
			if (process.env.MACHINE_ENV === 'personal') {
				propertiesImagesJSON = await Promise.all(
					propertiesJSON.map(async (prop) => {
						const { resources } = await cloudinary.search
							.expression(`folder:orvelian/properties/${prop.slider.folderName}`) // Filtrar por carpeta si lo deseas
							.max_results(30)
							.execute();
						return {
							...prop,
							slider: {
								...prop.slider,
								images: resources.map((file) => ({ url: file.secure_url })),
							},
						};
					})
				);
			} else {
				propertiesImagesJSON = cloudinaryProperties;
			}
		} catch (err) {
			console.log('Error al obtener las imágenes: ', err);
		}

		return propertiesImagesJSON;
	}

	static async getAllSlider() {
		return homePropertiesSlider;
	}

	static async getById({ id }) {
		if (!propertiesImagesJSON.length) {
			await this.getAll();
		}
		const property = propertiesImagesJSON.find((property) => property.id === id);
		return property;
	}

	static async create({ input }) {
		const newProperty = {
			id: randomUUID(),
			...input,
		};

		propertiesJSON.push(newProperty);

		return newProperty;
	}

	static async delete({ id }) {
		const propertyIndex = propertiesJSON.findIndex((property) => property.id === id);
		if (propertyIndex === -1) return false;

		propertiesJSON.splice(propertyIndex, 1);
		return true;
	}

	static async update({ id, input }) {
		const propertyIndex = propertiesJSON.findIndex((property) => property.id === id);
		if (propertyIndex === -1) return false;

		propertiesJSON[propertyIndex] = {
			...propertiesJSON[propertyIndex],
			...input,
		};

		return propertiesJSON[propertyIndex];
	}
}
