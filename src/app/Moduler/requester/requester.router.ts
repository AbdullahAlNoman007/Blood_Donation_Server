import express from 'express';
import { requesterController } from './requester.controller';



const router = express.Router()

router.get('/requester-list', requesterController.getRequester)

export const requesterRouter = router