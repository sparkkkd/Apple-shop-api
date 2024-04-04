import { v4 as uuidv4 } from 'uuid'
import path from 'path'
const __dirname = import.meta.dirname

import ApiError from '../exceptions/ApiError.js'

class FileService {
	allowedExtension = ['png', 'jpeg', 'jpg']

	uploadFile(file) {
		const extension = file.name.substring(file.name.lastIndexOf('.') + 1)

		if (!this.allowedExtension.includes(extension)) {
			delete file.data
			throw ApiError.BadFile(
				`Недопустимое расширение файла. Разрешенные расширения: ${allowedExtension}`
			)
		}

		const fileName = uuidv4() + '.' + extension
		file.mv(path.resolve(__dirname, '..', 'uploads', fileName))

		return fileName
	}
}

export default new FileService()
