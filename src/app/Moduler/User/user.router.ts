import express from 'express'
import { userController } from './user.controller'
import auth from '../../middleWare/auth'
import validateRequest from '../../middleWare/validationRequest'
import { validationSchema } from './user.validation'

const router = express.Router()

router.post('/register', validateRequest(validationSchema.userValidationSchema), userController.createUser)
router.get('/my-profile', auth(), userController.getProfile)
router.put('/my-profile', auth(), validateRequest(validationSchema.userUpdateSchema), userController.updateProfile)


export const userRouter = router