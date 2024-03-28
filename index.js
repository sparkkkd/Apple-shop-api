import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import ErrorMiddleware from './middlewares/ErrorMiddleware.js'
import UserRouter from './router/UserRouter.js'
import ProductRouter from './router/ProductRouter.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.API_URL,
	})
)

app.use('/api', UserRouter)
app.use('/api', ProductRouter)
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
