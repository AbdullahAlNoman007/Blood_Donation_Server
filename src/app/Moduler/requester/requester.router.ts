import express from 'express';
import { requesterController } from './requester.controller';



const router = express.Router()

router.get('/donor-list', requesterController.getRequester)

export const donorRouter = router