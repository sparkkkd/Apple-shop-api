import { Router } from 'express'
import { registerValidation } from '../validations/UserValidation.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

import UserController from '../controllers/UserController.js'

const router = new Router()

router.post('/register', registerValidation, UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/active/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', AuthMiddleware, UserController.getUsers)

export default router
