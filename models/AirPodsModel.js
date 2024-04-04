import mongoose, { Schema } from 'mongoose'

import ProductsModel, { productsDiscriminatorKey } from './ProductsModel.js'

const AirPodsSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		color: { type: String, required: true },
		preview: { type: String, require: true },
		images: [{ type: String, require: true }],
		moisture: { type: Boolean, required: true },
		material: { type: String, required: true },
		headphoneType: { type: String, required: true },
		minGhz: { type: String, required: true },
		maxGhz: { type: String, required: true },
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		count: { type: Number },
	},
	{ productsDiscriminatorKey }
)

const AirPodsModel = ProductsModel.discriminator('AirPods', AirPodsSchema)
export default AirPodsModel
