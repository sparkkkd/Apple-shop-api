import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Некорректный email адрес').isEmail(),
	body('password', 'Пароль должен состоять минимум из 6 символов').isLength({
		min: 6,
	}),
	body(
		'name',
		'Имя пользователя должно состоять минимум из 3 символов и максимум 20'
	).isLength({ min: 3, max: 20 }),
]
