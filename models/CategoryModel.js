import { Schema, model } from 'mongoose'

const CategoryModel = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		preview: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export default new model('Category', CategoryModel)
