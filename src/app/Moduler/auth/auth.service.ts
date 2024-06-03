import httpStatus from "http-status"
import AppError from "../../Error/AppError"
import prisma from "../../utility/prismaClient"
import { Tlogin } from "./auth.interface"
import bcrypt from 'bcrypt'
import config from "../../config"
import token from "../../utility/Token"

const loginInDB = async (payload: Tlogin) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isPasswordMatched = bcrypt.compareSync(payload.password, isUserExists.password)
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
    }

    const jwtPayload = {
        userId: isUserExists.id,
        email: isUserExists.email
    }

    const accessToken = token(jwtPayload, config.jwt.jwt_access_token as string, config.jwt.jwt_access_expires_in as string)

    return {
        id: isUserExists.id,
        name: isUserExists.name,
        email: isUserExists.email,
        token: accessToken
    };


}

export const authService = {
    loginInDB
}