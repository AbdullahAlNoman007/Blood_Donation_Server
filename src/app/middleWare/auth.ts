import httpStatus from "http-status";
import AppError from "../Error/AppError";
import catchAsync from "../utility/trycatch";
import { jwtDecode } from "jwt-decode";
import prisma from "../utility/prismaClient";
import { TdecodedData } from "../interface";


const auth = () => {

    return catchAsync(async (req, res, next) => {
        let decoded;
        const token = req.headers.authorization

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Please Put the Access Token")
        }
        try {
            decoded = jwtDecode(token) as TdecodedData
        } catch (error) {
            console.log(error);
            next(error)
        }
        await prisma.user.findUniqueOrThrow({
            where: {
                email: (decoded as TdecodedData).email
            }
        })
        req.user = decoded as TdecodedData;

        next()
    })

}
export default auth;