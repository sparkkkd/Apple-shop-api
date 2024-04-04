import mongoose, { Schema } from 'mongoose'

import ProductsModel, { productsDiscriminatorKey } from './ProductsModel.js'

const WatchesSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: String, required: true },
		color: { type: String, required: true },
		preview: { type: String, required: true },
		images: [{ type: String, required: true }],
		strapMaterial: { type: String, required: true },
		bodyColor: { type: String, required: true },
		bodyMaterial: { type: String, required: true },
		workTime: { type: String, required: true },
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		count: { type: Number },
	},
	{ productsDiscriminatorKey }
)

const WatchesModel = ProductsModel.discriminator('Watches', WatchesSchema)
export default WatchesModel
