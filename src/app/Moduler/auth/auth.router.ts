import express from 'express'
import validateRequest from '../../middleWare/validationRequest'
import { changePasswordValidation, loginValidation } from './auth.validation'
import { authController } from './auth.controller'


const router = express.Router()

router.post('/login', validateRequest(loginValidation), authController.login)
router.post('/change-password', validateRequest(changePasswordValidation), authController.login)

export const authRouter = router