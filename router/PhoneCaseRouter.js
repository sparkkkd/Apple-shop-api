import { Router } from 'express'
import PhoneCaseController from '../controllers/PhoneCaseController.js'

const PhoneCaseRouter = new Router()

PhoneCaseRouter.post('/case', PhoneCaseController.create)
PhoneCaseRouter.get('/case', PhoneCaseController.getAll)
PhoneCaseRouter.get('/case/:id', PhoneCaseController.get)
PhoneCaseRouter.delete('/case/:id', PhoneCaseController.delete)

export default PhoneCaseRouter
