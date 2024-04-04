import FileService from '../service/FileService.js'
import PhoneCaseModel from '../models/PhoneCase.js'

class PhoneCaseController {
	async create(req, res) {
		try {
			const { name, price, description, material, category, count } = req.body
			const { images, preview } = req.files

			const candidate = await PhoneCaseModel.find({ name })

			if (candidate.length) {
				await PhoneCaseModel.findOneAndUpdate(
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

			const phoneCase = new PhoneCaseModel({
				name,
				price,
				description,
				material,
				category,
				count,
				preview: previewName,
				images: imagesNames,
			})

			await phoneCase.save()

			return res.status(200).json(phoneCase)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async getAll(req, res) {
		try {
			const phoneCases = await PhoneCaseModel.find().populate({
				path: 'category',
				select: ['name'],
			})

			return res.status(200).json(phoneCases)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async get(req, res) {
		try {
			const { id } = req.params

			const phoneCase = await PhoneCaseModel.findById(id).populate({
				path: 'category',
				select: ['name'],
			})

			return res.status(200).json(phoneCase)
		} catch (error) {
			return res.status(500).json({ message: 'Ошибка на сервере' })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const { count } = req.body

			const candidate = await PhoneCaseModel.findById(id)

			if (candidate.count < count) {
				return res.status(500).json({ message: 'Вы указали кол-во большее, чем имеется в базе' })
			}

			if (candidate.count === count || !count) {
				await PhoneCaseModel.findByIdAndDelete(id)
				return res.status(200).json({ message: 'Все товары успешно удалены' })
			}

			if (candidate.count > count) {
				if (count > 1) {
					for (let i = 0; i <= count; i++) {
						await PhoneCaseModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - i })
					}

					return res.status(200).json({ message: `${count} товар(а) успешно удалены` })
				}

				if (count === 1) {
					await PhoneCaseModel.findByIdAndUpdate({ _id: id }, { count: candidate.count - 1 })

					return res.status(200).json({ message: 'Товар, в кол-ве 1шт. успешно удален' })
				}
			}
		} catch (error) {
			return res.status(500).json({ message: 'Серверная ошибка' })
		}
	}
}

export default new PhoneCaseController()
