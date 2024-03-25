import { Schema, model } from 'mongoose'

const ProductModel = new Schema({
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	preview: { type: String },
	colors: [{ type: String, required: true }],
	specs: {
		images: [{ type: String }],
		memory: { type: Number },
		ram: { type: Number },
		diagonal: { type: String },
	},
})

export default new model('Product', ProductModel)
