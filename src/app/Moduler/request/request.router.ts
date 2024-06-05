import express from 'express'
import auth from '../../middleWare/auth'
import validateRequest from '../../middleWare/validationRequest'
import { donationZodSchema } from './request.validation'
import { donationController } from './request.controller'
import { userRole } from '@prisma/client'

const router = express.Router()

router.post('/donation-request', auth(userRole.Requester), validateRequest(donationZodSchema.donationSchema), donationController.createDonationRequest)
router.get('/donation-request', auth(userRole.Admin, userRole.Donor, userRole.Requester), donationController.getDonationRequest)
router.put('/donation-request/:requestId', auth(userRole.Donor), donationController.updateDonationRequest)

export const donationRouter = router;