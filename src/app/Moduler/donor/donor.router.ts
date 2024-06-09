import express from 'express';
import { donorController } from './donor.controller';
import validateRequest from '../../middleWare/validationRequest';
import { changeStatusValidationSchema, donorZodSchema } from './donor.validation';
import auth from '../../middleWare/auth';
import { userRole } from '@prisma/client';

const router = express.Router()

router.get('/donor-list', donorController.getDonor)
router.get('/donor-list/:id', donorController.getByDonor)
router.delete('/:id', auth(userRole.Admin), donorController.deleteDonor)
router.put('/chage-status/:id', auth(userRole.Admin), validateRequest(changeStatusValidationSchema), donorController.changeStatus)
router.put('/update-donor/:id', auth(userRole.Admin, userRole.Donor), validateRequest(donorZodSchema.donorValidationSchema), donorController.updateDonor)

export const donorRouter = router