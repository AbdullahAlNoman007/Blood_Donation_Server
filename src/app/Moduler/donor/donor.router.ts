import express from 'express';
import { donorController } from './donor.controller';

const router = express.Router()

router.get('/donor-list', donorController.getDonor)
router.delete('/:id', donorController.deleteDonor)

export const donorRouter = router