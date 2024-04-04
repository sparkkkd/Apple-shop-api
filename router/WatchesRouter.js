import { Router } from 'express'
import WatchesController from '../controllers/WatchesController.js'

const WatchesRouter = new Router()

WatchesRouter.post('/watches', WatchesController.create)
WatchesRouter.get('/watches', WatchesController.getAll)
WatchesRouter.get('/watches/:id', WatchesController.getOne)
WatchesRouter.delete('/watches/:id', WatchesController.delete)

export default WatchesRouter
