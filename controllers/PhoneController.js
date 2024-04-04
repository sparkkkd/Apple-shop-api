import PhoneModel from '../models/PhoneModel.js'
import FileService from '../service/FileService.js'

class PhoneController {
	async create(req, res) {
		try {
			const { name, price, color, memory, screen, fps, sim, category, count = 1 } = req.body
			const { preview, images } = req.files

			const candidate = await PhoneModel.find({ name })

			if (candidate.length) {
				await PhoneModel.findOneAndUpdate({ name }, { count: candidate[0].count + Number(count) })

				return res
					.status(200)
					.json({ message: `Товар ${name} уже находился в базе. Количество увелчиено на ${count}` })
			}

			const previewName = FileService.uploadFile(preview)
			let imagesNames = []
			images.forEach((image) => {
				imagesNames.push(FileService.uploadFile(image))
			})

			const phone = new PhoneModel({
				name,
				price,
				color,
				memory,
				screen,
				fps,
				sim,
				preview: previewName,
				images: imagesNames,
				category: { _id: category },
				count,
			})

			await phone.save()

			return res.json({ phone })
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async getAll(req, res) {
		try {
			const phone = await PhoneModel.find().populate({ path: 'category', select: ['name'] })

			if (!phone) {
				return res.status(404).json({ message: 'Товар не найден' })
			}

			return res.json(phone)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка сервера' })
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params

			const phone = await PhoneModel.findById(id).populate({
				path: 'category',
				select: ['name'],
			})

			return res.status(200).json(phone)
		} catch (error) {
			return res.status(500).json({ message: 'Товар не найден' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const { count } = req.body

			const candidate = await PhoneModel.findById(id)

			if (candidate.count < count) {
				return res.status(500).json({ message: 'Вы указали кол-во большее, чем имеется в базе' })
			}

			if (candidate.count === count || !count) {
				await PhoneModel.findByIdAndDelete(id)
				return res.status(200).json({ message: 'Все товары успешно удалены' })
			}

			if (candidate.count > count) {
				if (count > 1) {
					for (let i = 0; i <= count; i++) {
						await PhoneModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - i })
					}

					return res.status(200).json({ message: `${count} товар(а) успешно удалены` })
				}

				if (count === 1) {
					await PhoneModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - 1 })

					return res.status(200).json({ message: 'Товар, в кол-ве 1шт. успешно удален' })
				}
			}
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}
}

export default new PhoneController()
