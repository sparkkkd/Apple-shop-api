import { Router } from 'express'
import MacBookController from '../controllers/MacBookController.js'

const MacBookRouter = new Router()

MacBookRouter.post('/macbook', MacBookController.create)
MacBookRouter.get('/macbook', MacBookController.getAll)
MacBookRouter.get('/macbook/:id', MacBookController.getOne)
MacBookRouter.delete('/macbook/:id', MacBookController.delete)

export default MacBookRouter
