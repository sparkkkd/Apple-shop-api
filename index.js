import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

import ErrorMiddleware from './middlewares/ErrorMiddleware.js'
import UserRouter from './router/UserRouter.js'
import ProductsRouter from './router/ProductsRouter.js'
import CategoryRouter from './router/CategoryRouter.js'
import PhoneRouter from './router/PhoneRouter.js'
import MacBookRouter from './router/MacBookRouter.js'
import AirPodsRouter from './router/AirPodsRouter.js'
import EarPodsRouter from './router/EarPodsRouter.js'
import WatchesRouter from './router/WatchesRouter.js'
import PhoneCaseRouter from './router/PhoneCaseRouter.js'
import AccessoriesRouter from './router/AccessoriesRouter.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(fileUpload({}))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.API_URL,
	})
)

app.use('/api', ProductsRouter)
app.use('/api', UserRouter)
app.use('/api', CategoryRouter)
app.use('/api', PhoneRouter)
app.use('/api', MacBookRouter)
app.use('/api', AirPodsRouter)
app.use('/api', EarPodsRouter)
app.use('/api', WatchesRouter)
app.use('/api', PhoneCaseRouter)
app.use('/api', AccessoriesRouter)
app.use(ErrorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)
		app.listen(process.env.PORT, () => {
			console.log(`Server start on port ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
