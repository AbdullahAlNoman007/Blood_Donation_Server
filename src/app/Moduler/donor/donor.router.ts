import express from 'express';
import { donorController } from './donor.controller';
import validateRequest from '../../middleWare/validationRequest';
import { changeStatusValidationSchema, donorZodSchema } from './donor.validation';

const router = express.Router()

router.get('/donor-list', donorController.getDonor)
router.delete('/:id', donorController.deleteDonor)
router.put('/chage-status/:id', validateRequest(changeStatusValidationSchema), donorController.changeStatus)
router.put('/update-donor/:id', validateRequest(donorZodSchema.donorValidationSchema), donorController.updateDonor)

export const donorRouter = router