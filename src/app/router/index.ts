import express from 'express'
import { userRouter } from '../Moduler/User/user.router';
import { authRouter } from '../Moduler/auth/auth.router';
import { donorRouter } from '../Moduler/donor/donor.router';

const router = express.Router()

const moduleRouters = [
    {
        path: '/',
        route: userRouter
    },
    {
        path: '/',
        route: authRouter
    },
    {
        path: '/',
        route: donorRouter
    }
]

moduleRouters?.map(route => router.use(route.path, route.route))

export default router;