import express from 'express';
import { donorController } from './donor.controller';
import auth from '../../middleWare/auth';
import validateRequest from '../../middleWare/validationRequest';
import { donationSchema } from './donor.validation';

const router = express.Router()

router.get('/donor-list', donorController.getDonor)
router.post('/donation-request', auth(), validateRequest(donationSchema), donorController.createDonorRequest)
router.get('/donation-request', auth(), donorController.getDonationRequest)
router.put('/donation-request/:requestId', auth(), donorController.updateDonationRequest)

export const donorRouter = router