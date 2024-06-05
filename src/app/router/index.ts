import express from 'express'
import { userRouter } from '../Moduler/User/user.router';
import { authRouter } from '../Moduler/auth/auth.router';
import { donorRouter } from '../Moduler/donor/donor.router';
import { requesterRouter } from '../Moduler/requester/requester.router';
import { donationRouter } from '../Moduler/request/request.router';

const router = express.Router()

const moduleRouters = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/donor',
        route: donorRouter
    },
    {
        path: '/requester',
        route: requesterRouter
    },
    {
        path: '/donation',
        route: donationRouter
    },
]

moduleRouters?.map(route => router.use(route.path, route.route))

export default router;