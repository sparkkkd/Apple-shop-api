// import ProductService from '../service/ProductService.js'
import ProductModel from '../models/ProductModel.js'

class ProductController {
	async post(req, res, next) {
		try {
			let { productName, price, preview, colors, specs } = req.body
			colors = colors.split(' ')

			const product = await ProductModel.create({
				productName,
				price,
				preview,
				colors,
				specs,
			})

			return res
				.status(200)
				.json({ message: `Товар ${productName} успешно создан` })
		} catch (error) {
			console.log(error.message)
		}
	}

	async getAll(req, res, next) {
		try {
			const allProducts = await ProductModel.find()
			return res.status(200).json(allProducts)
		} catch (error) {
			return res.status(500).json()
		}
	}

	async getOne(req, res, next) {
		try {
			const _id = req.params.id

			const product = await ProductModel.findOne({ _id })

			if (!product) res.status(404).json({ message: 'Товар не найден' })

			return res.status(200).json(product)
		} catch (error) {
			console.log(error)
			return res.status(404).json({ message: 'Товар не найден' })
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params
			let { productName, price, preview, colors, specs } = req.body
			colors = colors.split(' ')

			await ProductModel.findOneAndUpdate(
				{ _id: id },
				{
					productName,
					price,
					preview,
					colors,
					specs,
				}
			)

			return res.status(200).json({ message: 'Товар успешно обновлен' })
		} catch (error) {
			return res.status(404).json({ message: error.message })
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params

			await ProductModel.findOneAndDelete({ _id: id })

			return res.status(200).json({ message: `Товар ${id} успешно удален` })
		} catch (error) {
			return res.status(404).json({ message: error.message })
		}
	}
}

export default new ProductController()
