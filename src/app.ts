import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router';
import notFound from './app/middleWare/notFound';
import globalErrorHandle from './app/middleWare/globalErrorHandle';
import cookieParser from 'cookie-parser';


const app: Application = express();

const allowedOrigins = ['http://localhost:3000'];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: `Blood Donation ...`
    })
})

app.use(globalErrorHandle)
app.use(notFound)

export default app;