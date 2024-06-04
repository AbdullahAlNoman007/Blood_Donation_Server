import express from 'express';
import { requesterController } from './requester.controller';
import validateRequest from '../../middleWare/validationRequest';
import { changeStatusValidationSchema } from '../donor/donor.validation';
import { requesterZodSchema } from './requester.validation';



const router = express.Router()

router.get('/requester-list', requesterController.getRequester)
router.delete('/:id', requesterController.deleteRequester)
router.put('/chage-status/:id', validateRequest(changeStatusValidationSchema), requesterController.changeStatus)
router.put('/update-requester/:id', validateRequest(requesterZodSchema.requesterUpdatedSchema), requesterController.updateRequester)

export const requesterRouter = router