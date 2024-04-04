// import { Router } from 'express'
// import multer from 'multer'

// import UploadController from '../controllers/UploadController.js'
// import AdminMiddleware from '../middlewares/AdminMiddleware.js'

// const uploadRouter = new Router()

// const storage = multer.diskStorage({
// 	destination: (_, __, cb) => {
// 		cb(null, 'uploads')
// 	},
// 	filename: (_, file, cb) => {
// 		cb(null, file.originalname)
// 	},
// })

// const upload = multer({ storage })

// uploadRouter.post('/uploads', AdminMiddleware, upload.single('image'), UploadController.post)

// export default uploadRouter
