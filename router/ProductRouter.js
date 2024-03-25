import { Router } from 'express'
import ProductController from '../controllers/ProductController.js'

const router = new Router()

router.post('/product', ProductController.post)
router.get('/product', ProductController.getAll)
router.get('/product/:id', ProductController.getOne)
router.patch('/product/:id', ProductController.update)
router.delete('/product/:id', ProductController.delete)

export default router
