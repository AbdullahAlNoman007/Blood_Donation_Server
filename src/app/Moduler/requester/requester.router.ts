import express from 'express';
import { requesterController } from './requester.controller';
import validateRequest from '../../middleWare/validationRequest';
import { changeStatusValidationSchema } from '../donor/donor.validation';
import { requesterZodSchema } from './requester.validation';
import auth from '../../middleWare/auth';
import { userRole } from '@prisma/client';



const router = express.Router()

router.get('/requester-list', auth(userRole.Admin, userRole.Donor), requesterController.getRequester)
router.delete('/:id', auth(userRole.Admin), requesterController.deleteRequester)
router.put('/chage-status/:id', auth(userRole.Admin), validateRequest(changeStatusValidationSchema), requesterController.changeStatus)
router.put('/update-requester/:id', auth(userRole.Admin, userRole.Requester), validateRequest(requesterZodSchema.requesterUpdatedSchema), requesterController.updateRequester)

export const requesterRouter = router