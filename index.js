import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

const start = async () => {
	try {
		app.listen(5000, () => {
			console.log(`Server start on port ${PORT}`)
		})
	} catch (error) {}
}

start()
