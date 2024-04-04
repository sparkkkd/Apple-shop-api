import { Router } from 'express'
import { registerValidation } from '../validations/UserValidation.js'
import UserController from '../controllers/UserController.js'

import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import AdminMiddleware from '../middlewares/AdminMiddleware.js'

const router = new Router()

router.post('/register', registerValidation, UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/active/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', AuthMiddleware, UserController.getUsers)
router.get('/users/role/:id', AdminMiddleware, UserController.setUserRole)

export default router
