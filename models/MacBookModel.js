import mongoose, { Schema } from 'mongoose'

import ProductsModel, { productsDiscriminatorKey } from './ProductsModel.js'

const MacBookSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		color: { type: String, required: true },
		memory: { type: String, required: true },
		screen: { type: String, required: true },
		fps: { type: String, required: true },
		processor: { type: String, required: true },
		diagonal: { type: String, required: true },
		preview: { type: String, require: true },
		images: [{ type: String, require: true }],
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		count: { type: Number },
	},
	{ productsDiscriminatorKey }
)

const MacBookModel = ProductsModel.discriminator('MacBook', MacBookSchema)
export default MacBookModel
