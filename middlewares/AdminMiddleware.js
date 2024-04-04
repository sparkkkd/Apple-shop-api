import jwt from 'jsonwebtoken'
import ApiError from '../exceptions/ApiError.js'
import dotenv from 'dotenv'

dotenv.config()

export default function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization

		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]

		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		const { role } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

		console.log(role)

		let isValidRole = role === 'Admin'

		if (!isValidRole) {
			return res.status(403).json({ message: 'У вас нет прав администратора' })
		}

		next()
	} catch (error) {
		console.log(`123`)
		return res.json({ message: 'catch', error })
		// return next(ApiError.UnauthorizedError())
	}
}
