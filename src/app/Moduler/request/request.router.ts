import express from 'express'
import auth from '../../middleWare/auth'
import validateRequest from '../../middleWare/validationRequest'
import { donationZodSchema } from './request.validation'
import { donationController } from './request.controller'

const router = express.Router()

router.post('/donation-request', validateRequest(donationZodSchema.donationSchema), donationController.createDonationRequest)
router.get('/donation-request', donationController.getDonationRequest)
router.put('/donation-request/:requestId', donationController.updateDonationRequest)

export const donationRouter = router;