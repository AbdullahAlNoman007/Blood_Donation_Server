import express from 'express'
import validateRequest from '../../middleWare/validationRequest'
import { changePasswordValidation, loginValidation } from './auth.validation'
import { authController } from './auth.controller'
import auth from '../../middleWare/auth'
import { userRole } from '@prisma/client'


const router = express.Router()

router.post('/login', validateRequest(loginValidation), authController.login)
router.post('/change-password', auth(userRole.Admin, userRole.Donor, userRole.Requester), validateRequest(changePasswordValidation), authController.changePassword)

export const authRouter = router