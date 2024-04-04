import ProductsModel from '../models/ProductsModel.js'

class ProductsController {
	async getAll(req, res) {
		const products = await ProductsModel.find().populate({ path: 'category' })

		return res.json(products)
	}
}

export default new ProductsController()
