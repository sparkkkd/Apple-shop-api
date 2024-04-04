import WatchesModel from '../models/WatchesModel.js'
import FileService from '../service/FileService.js'

class WatchesController {
	async create(req, res) {
		try {
			const {
				name,
				price,
				color,
				strapMaterial,
				bodyColor,
				bodyMaterial,
				workTime,
				category,
				count = 1,
			} = req.body

			const { preview, images } = req.files

			const candidate = await WatchesModel.find({ name })

			if (candidate.length) {
				await WatchesModel.findOneAndUpdate({ name }, { count: candidate[0].count + Number(count) })

				return res
					.status(200)
					.json({ message: `Товар ${name} уже находился в базе. Количество увелчиено на ${count}` })
			}

			const previewName = FileService.uploadFile(preview)
			let imagesNames = []
			images.forEach((image) => {
				imagesNames.push(FileService.uploadFile(image))
			})

			const watch = new WatchesModel({
				name,
				color,
				price,
				strapMaterial,
				bodyMaterial,
				bodyColor,
				workTime,
				category,
				count,
				preview: previewName,
				images: imagesNames,
			})

			await watch.save()

			return res.status(200).json(watch)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async getAll(req, res) {
		try {
			const watches = await WatchesModel.find().populate({ path: 'category', select: ['name'] })

			return res.status(200).json(watches)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params

			const watch = await WatchesModel.findById(id)

			return res.status(200).json(watch)
		} catch (error) {
			return res.status(404).json({ message: 'Товар не найден' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const { count } = req.body

			const candidate = await WatchesModel.findById(id)

			if (candidate.count < count) {
				return res.status(500).json({ message: 'Вы указали кол-во большее, чем имеется в базе' })
			}

			if (candidate.count === count || !count) {
				await WatchesModel.findByIdAndDelete(id)
				return res.status(200).json({ message: 'Все товары успешно удалены' })
			}

			if (candidate.count > count) {
				if (count > 1) {
					for (let i = 0; i <= count; i++) {
						await WatchesModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - i })
					}

					return res.status(200).json({ message: `${count} товар(а) успешно удалены` })
				}

				if (count === 1) {
					await WatchesModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - 1 })

					return res.status(200).json({ message: 'Товар, в кол-ве 1шт. успешно удален' })
				}
			}
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}
}

export default new WatchesController()
