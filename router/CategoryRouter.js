import { Router } from 'express'
import CategoryController from '../controllers/CategoryController.js'

const router = new Router()

router.post('/category', CategoryController.create)
router.get('/category', CategoryController.getAll)
router.patch('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

export default router
