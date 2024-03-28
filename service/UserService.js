import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import ApiError from '../exceptions/ApiError.js'

import UserModel from '../models/UserModel.js'

import MailService from './MailService.js'
import TokenService from './TokenService.js'
import UserDto from '../dtos/UserDto.js'

class UserService {
	async register(email, password, name) {
		const candidate = await UserModel.findOne({ email })

		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const activationLink = uuidv4()

		const user = await UserModel.create({
			email,
			password: hashPassword,
			name,
			activationLink,
		})

		await MailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/active/${activationLink}`
		)

		const userDto = new UserDto(user) // DTO email, name, id, isActivated
		const tokens = TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto, navigateTo: '/thanks' }
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink })

		if (!user) {
			throw ApiError.BadRequest('Некорректная ссылка активации')
		}

		user.isActivated = true

		await user.save()
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email })

		if (!user) {
			throw ApiError.BadRequest('Пользователь не был найден')
		}

		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword) {
			throw ApiError.BadRequest('Неверный пароль')
		}

		const userDto = new UserDto(user)
		const tokens = TokenService.generateTokens({ ...userDto })

		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto, navigateTo: '/' }
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		const userData = TokenService.validateRefreshToken(refreshToken)

		const tokenFromDb = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}

		const user = await UserModel.findById(userData.id)

		const userDto = new UserDto(user)
		const tokens = TokenService.generateTokens({ ...userDto })

		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto, navigateTo: '' }
	}

	async getAllUsers() {
		const users = await UserModel.find()
		return users
	}
}

export default new UserService()
