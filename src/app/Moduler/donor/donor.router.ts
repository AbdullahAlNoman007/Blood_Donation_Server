import express from 'express';
import { donorController } from './donor.controller';
import auth from '../../middleWare/auth';
import validateRequest from '../../middleWare/validationRequest';
import { donationSchema } from './donor.validation';

const router = express.Router()

router.get('/donor-list', donorController.getDonor)

export const donorRouter = router