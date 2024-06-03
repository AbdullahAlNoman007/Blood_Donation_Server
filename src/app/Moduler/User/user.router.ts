import express from 'express'
import { userController } from './user.controller'
import auth from '../../middleWare/auth'
import validateRequest from '../../middleWare/validationRequest'
import { validationSchema } from './user.validation'

const router = express.Router()

router.post(
    '/create-admin',
    validateRequest(validationSchema.adminValidationSchema),
    userController.createAdmin
)
router.post(
    '/create-donor',
    validateRequest(validationSchema.donorValidationSchema),
    userController.createDonor
)
router.post(
    '/create-requester',
    validateRequest(validationSchema.requesterValidationSchema),
    userController.createRequester
)


export const userRouter = router