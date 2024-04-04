import { Router } from 'express'
import EarPodsController from '../controllers/EarPodsController.js'

const EarPodsRouter = new Router()

EarPodsRouter.post('/earpods', EarPodsController.create)
EarPodsRouter.get('/earpods', EarPodsController.getAll)
EarPodsRouter.get('/earpods/:id', EarPodsController.getOne)
EarPodsRouter.delete('/earpods/:id', EarPodsController.delete)

export default EarPodsRouter
