import { Schema, model } from 'mongoose'

export const productsDiscriminatorKey = 'productKind'

const ProductsSchema = new Schema(
	{
		name: { type: String },
	},
	{ productsDiscriminatorKey }
)

export default model('Products', ProductsSchema)
