import mongoose, { Schema } from 'mongoose'
import ProductsModel, { productsDiscriminatorKey } from './ProductsModel.js'

const AccessoriesSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: String, required: true },
		description: { type: String, required: true },
		preview: { type: String, required: true },
		images: [{ type: String, required: true }],
		accessoryType: { type: String, required: true },
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
		count: { type: Number },
	},
	{ productsDiscriminatorKey }
)

const AccessoriesModel = ProductsModel.discriminator('Accessories', AccessoriesSchema)
export default AccessoriesModel
