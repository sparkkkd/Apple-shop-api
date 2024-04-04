import EarPodsModel from '../models/EarPodsModel.js'
import FileService from '../service/FileService.js'

class earpodsController {
	async create(req, res) {
		try {
			const {
				name,
				price,
				color,
				moisture,
				material,
				headphoneType,
				minGhz,
				maxGhz,
				category,
				count = 1,
			} = req.body

			const { images, preview } = req.files

			const candidate = await EarPodsModel.find({ name })

			if (candidate.length) {
				await EarPodsModel.findOneAndUpdate({ name }, { count: candidate[0].count + Number(count) })

				return res
					.status(200)
					.json({ message: `Товар ${name} уже находился в базе. Количество увелчиено на ${count}` })
			}

			const previewName = FileService.uploadFile(preview)
			let imagesNames = []
			images.forEach((image) => {
				imagesNames.push(FileService.uploadFile(image))
			})

			const earpods = new EarPodsModel({
				name,
				price,
				color,
				moisture,
				material,
				headphoneType,
				minGhz,
				maxGhz,
				category,
				count,
				preview: previewName,
				images: imagesNames,
			})

			await earpods.save()

			return res.status(200).json(earpods)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере', error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const earpods = await EarPodsModel.find().populate({ path: 'category', select: ['name'] })

			if (!earpods.length) {
				return res.status(404).json({ message: 'Товары не найдены' })
			}

			return res.status(200).json(earpods)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params

			const earpods = await EarPodsModel.findById(id)

			return res.status(200).json(earpods)
		} catch (error) {
			return res.status(500).json({ message: 'Товар не найден' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const { count } = req.body

			if (count) {
				const candidate = await EarPodsModel.findById(id)

				if (candidate.count < count) {
					return res.status(500).json({ message: 'Вы указали кол-во большее, чем имеется в базе' })
				}

				if (candidate.count === count) {
					await EarPodsModel.findByIdAndDelete(id)
					return res.status(200).json({ message: 'Все товары успешно удалены' })
				}

				if (candidate.count > count) {
					if (count > 1) {
						for (let i = 0; i <= count; i++) {
							await EarPodsModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - i })
						}

						return res.status(200).json({ message: `${count} товар(а) успешно удалены` })
					}

					if (count === 1) {
						await EarPodsModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - 1 })

						return res.status(200).json({ message: 'Товар, в кол-ве 1шт. успешно удален' })
					}
				}
			}

			await EarPodsModel.findByIdAndDelete(id)
			return res.status(200).json({ message: 'Все товары успешн удалены' })
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}
}

export default new earpodsController()
