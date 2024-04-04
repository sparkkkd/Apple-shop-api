import mongoose, { Schema } from 'mongoose'

import ProductsModel, { productsDiscriminatorKey } from './ProductsModel.js'

const PhoneSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: String, required: true },
		color: { type: String, required: true },
		memory: { type: String, required: true },
		screen: { type: String, required: true },
		fps: { type: String, required: true },
		sim: { type: String, required: true },
		preview: { type: String, required: true },
		images: [{ type: String, required: true }],
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		count: { type: Number },
	},
	{ productsDiscriminatorKey }
)

const PhoneModel = ProductsModel.discriminator('Phones', PhoneSchema)
export default PhoneModel
