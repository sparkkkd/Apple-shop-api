import { Router } from 'express'
import AccessoriesController from '../controllers/AccessoriesController.js'

const AccessoriesRouter = new Router()

AccessoriesRouter.post('/accessory', AccessoriesController.create)
AccessoriesRouter.get('/accessory/', AccessoriesController.getAll)
AccessoriesRouter.get('/accessory/:id', AccessoriesController.get)
AccessoriesRouter.delete('/accessory/:id', AccessoriesController.delete)

export default AccessoriesRouter
