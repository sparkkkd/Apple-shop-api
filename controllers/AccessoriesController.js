import AccessoriesModel from '../models/AccessoriesModel.js'
import FileService from '../service/FileService.js'

class AccessoriesController {
	async create(req, res) {
		try {
			const { name, price, description, accessoryType, category, count } = req.body
			const { preview, images } = req.files

			const candidate = await AccessoriesModel.find({ name })

			if (candidate.length) {
				await AccessoriesModel.findOneAndUpdate(
					{ name },
					{ count: candidate[0].count + Number(count) }
				)
				return res
					.status(200)
					.json({ message: `Товар ${name} уже находился в базе. Количество увелчиено на ${count}` })
			}

			const previewName = FileService.uploadFile(preview)
			let imagesNames = []
			images.forEach((image) => {
				imagesNames.push(FileService.uploadFile(image))
			})

			const accessory = new AccessoriesModel({
				name,
				price,
				description,
				accessoryType,
				category,
				count,
				preview: previewName,
				images: imagesNames,
			})

			await accessory.save()

			return res.status(200).json(accessory)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере', error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const accessories = await AccessoriesModel.find().populate({
				path: 'category',
				select: ['name'],
			})

			return res.status(200).json(accessories)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере', error: error.message })
		}
	}

	async get(req, res) {
		try {
			const { id } = req.params

			const accessory = await AccessoriesModel.findById(id).populate({
				path: 'category',
				select: ['name'],
			})

			return res.status(200).json(accessory)
		} catch (error) {
			return res.status(500).json({ message: 'Товар не найден' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const { count } = req.body

			if (count) {
				const candidate = await AccessoriesModel.findById(id)

				if (candidate.count < count) {
					return res.status(500).json({ message: 'Вы указали кол-во большее, чем имеется в базе' })
				}

				if (candidate.count === count) {
					await AccessoriesModel.findByIdAndDelete(id)
					return res.status(200).json({ message: 'Все товары успешно удалены' })
				}

				if (candidate.count > count) {
					if (count > 1) {
						for (let i = 0; i <= count; i++) {
							await AccessoriesModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - i })
						}

						return res.status(200).json({ message: `${count} товар(а) успешно удалены` })
					}

					if (count === 1) {
						await AccessoriesModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - 1 })

						return res.status(200).json({ message: 'Товар, в кол-ве 1шт. успешно удален' })
					}
				}
			}

			await AccessoriesModel.findByIdAndDelete(id)
			return res.status(200).json({ message: 'Все товары успешн удалены' })
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}
}

export default new AccessoriesController()
