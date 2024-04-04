import { Router } from 'express'
import AirPodsController from '../controllers/AirPodsController.js'

const AirPodsRouter = new Router()

AirPodsRouter.post('/airpods', AirPodsController.create)
AirPodsRouter.get('/airpods', AirPodsController.getAll)
AirPodsRouter.get('/airpods/:id', AirPodsController.getOne)
AirPodsRouter.delete('/airpods/:id', AirPodsController.delete)

export default AirPodsRouter
