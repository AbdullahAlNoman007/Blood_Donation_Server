import express from 'express';
import { donorController } from './donor.controller';
import validateRequest from '../../middleWare/validationRequest';
import { changeStatusValidationSchema } from './donor.validation';

const router = express.Router()

router.get('/donor-list', donorController.getDonor)
router.delete('/:id', donorController.deleteDonor)
router.put('/chage-status/:id', validateRequest(changeStatusValidationSchema), donorController.changeStatus)

export const donorRouter = router