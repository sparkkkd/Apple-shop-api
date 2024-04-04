import { Router } from 'express'
import PhoneController from '../controllers/PhoneController.js'

const PhoneRouter = new Router()

PhoneRouter.post('/phone', PhoneController.create)
PhoneRouter.get('/phone', PhoneController.getAll)
PhoneRouter.get('/phone/:id', PhoneController.getOne)
PhoneRouter.delete('/phone/:id', PhoneController.delete)

export default PhoneRouter
