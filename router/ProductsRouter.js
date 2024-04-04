import { Router } from 'express'
import ProductsController from '../controllers/ProductsController.js'

const ProductsRouter = new Router()

ProductsRouter.get('/products', ProductsController.getAll)

export default ProductsRouter
