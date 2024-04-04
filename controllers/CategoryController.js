import CategoryModel from '../models/CategoryModel.js'

class CategoryController {
	async create(req, res) {
		try {
			const { name, preview } = req.body

			const category = new CategoryModel({ name, preview })

			await category.save()

			return res.status(200).json(category)
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const categories = await CategoryModel.find().exec()

			return res.status(200).json(categories)
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id, name, preview } = req.body

			const category = await CategoryModel.findAndUpdate({ _id: id }, { name, preview })

			return res.status(200).json(category)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.body

			await CategoryModel.findAndDelete({ _id: id })

			return res.status(200).json({ message: 'Категория успешно удаленна' })
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}

export default new CategoryController()
