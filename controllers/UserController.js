import dotenv from 'dotenv'

import UserService from '../service/UserService.js'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/ApiError.js'

dotenv.config()

class UserController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}

			const { email, password, name } = req.body
			const userData = await UserService.register(email, password, name)

			// Add field "secure: true" in cookie settings if https instead https
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body

			const userData = await UserService.login(email, password)

			// Add field "secure: true" in cookie settings if https instead https
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies

			const token = await UserService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.status(200).json({ message: 'Выход осуществлен успешно' })
		} catch (error) {
			next(error)
		}
	}

	async activate(req, res, next) {
		try {
			const { link } = req.params

			await UserService.activate(link)

			return res.redirect(process.env.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies

			const userData = await UserService.refresh(refreshToken)

			// Add field "secure: true" in cookie settings if https instead https
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await UserService.getAllUsers()
			res.json(users)
		} catch (error) {
			next(error)
		}
	}

	async setUserRole(req, res, next) {
		try {
			const { id } = req.params
			const { role } = req.body
			const user = await UserService.setUserRole(id, role)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()
