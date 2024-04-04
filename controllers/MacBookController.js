import MacBookModel from '../models/MacBookModel.js'
import FileService from '../service/FileService.js'

class MacBookController {
	async create(req, res, next) {
		try {
			const {
				name,
				price,
				color,
				memory,
				screen,
				fps,
				processor,
				diagonal,
				category,
				count = 1,
			} = req.body
			const { preview, images } = req.files

			const candidate = await MacBookModel.find({ name })

			if (candidate.length) {
				await MacBookModel.findOneAndUpdate({ name }, { count: candidate[0].count + Number(count) })

				return res
					.status(200)
					.json({ message: `Товар ${name} уже находился в базе. Количество увелчиено на ${count}` })
			}

			const previewName = FileService.uploadFile(preview)

			let imagesNames = []
			images.forEach((image) => {
				imagesNames.push(FileService.uploadFile(image))
			})

			const macbook = new MacBookModel({
				name,
				price,
				color,
				memory,
				screen,
				fps,
				processor,
				diagonal,
				category,
				preview: previewName,
				images: imagesNames,
				count,
			})

			macbook.save()

			return res.json(macbook)
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const macbooks = await MacBookModel.find().populate({
				path: 'category',
				select: ['name'],
			})

			if (!macbooks.length) {
				return res.status(404).json({ message: 'Товары не найдены' })
			}

			return res.status(200).json(macbooks)
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params

			const macbook = await MacBookModel.findById(id).populate({
				path: 'category',
				select: ['name'],
			})

			return res.status(200).json(macbook)
		} catch (error) {
			return res.status(500).json({ message: 'Товар не найден' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const { count } = req.body

			if (count) {
				const candidate = await MacBookModel.findById(id)

				if (candidate.count < count) {
					return res.status(500).json({ message: 'Вы указали кол-во большее, чем имеется в базе' })
				}

				if (candidate.count === count) {
					await MacBookModel.findByIdAndDelete(id)
					return res.status(200).json({ message: 'Все товары успешно удалены' })
				}

				if (candidate.count > count) {
					if (count > 1) {
						for (let i = 0; i <= count; i++) {
							await MacBookModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - i })
						}

						return res.status(200).json({ message: `${count} товар(а) успешно удалены` })
					}

					if (count === 1) {
						await MacBookModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - 1 })

						return res.status(200).json({ message: 'Товар, в кол-ве 1шт. успешно удален' })
					}
				}
			}

			await MacBookModel.findByIdAndDelete(id)
			return res.status(200).json({ message: 'Все товары успешн удалены' })
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}
}

export default new MacBookController()
