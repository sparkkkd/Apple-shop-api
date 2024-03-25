import ProductModel from '../models/ProductModel.js'

class ProductService {
	async post(productName, price, preview, colors, specs) {
		const doc = await ProductModel.create({
			productName,
			price,
			preview,
			colors,
			specs,
		})

		return await doc.save()
	}

	async getAll() {
		const allProducts = await ProductModel.find()

		if (!allProducts) 'Товары не найдены'

		return await allProducts
	}
}

export default new ProductService()
