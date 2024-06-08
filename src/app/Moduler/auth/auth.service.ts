import httpStatus from "http-status"
import AppError from "../../Error/AppError"
import prisma from "../../utility/prismaClient"
import { IchangePassword, Tlogin } from "./auth.interface"
import bcrypt from 'bcrypt'
import config from "../../config"
import token from "../../utility/Token"
import { TdecodedData } from "../../interface"

const loginInDB = async (payload: Tlogin) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    let userDetails;

    if (isUserExists.role === 'Admin') {
        userDetails = await prisma.admin.findUniqueOrThrow({
            where: {
                userId: isUserExists.id
            }
        })
    }
    if (isUserExists.role === 'Donor') {
        userDetails = await prisma.donor.findUniqueOrThrow({
            where: {
                userId: isUserExists.id
            }
        })
    }
    if (isUserExists.role === 'Requester') {
        userDetails = await prisma.requester.findUniqueOrThrow({
            where: {
                userId: isUserExists.id
            }
        })
    }

    const isPasswordMatched = bcrypt.compareSync(payload.password, isUserExists.password)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
    }

    const jwtPayload = {
        userId: isUserExists.id,
        email: isUserExists.email,
        role: isUserExists.role
    }

    const accessToken = token(jwtPayload, config.jwt.jwt_access_token as string, config.jwt.jwt_access_expires_in as string)

    return {
        id: isUserExists.id,
        name: userDetails?.name,
        email: isUserExists.email,
        token: accessToken
    };

}

const changePassword = async (payload: IchangePassword, decode: TdecodedData) => {

    if (payload.newPassword !== payload.confirmPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password and Confirm Password don't match!!!")
    }

    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            id: decode.userId,
            email: decode.email,
            status: 'ACTIVE'
        }
    })

    const isPasswordMatched = bcrypt.compareSync(payload.oldPassword, isUserExists.password);


    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match");
    }

    const hashPassword = await bcrypt.hash(payload.newPassword, Number(config.hash_salt_round as string));


    const result = await prisma.user.update({
        where: {
            id: decode.userId,
            email: decode.email,
            status: 'ACTIVE'
        },
        data: {
            password: hashPassword
        }
    })

    return result
}

export const authService = {
    loginInDB,
    changePassword
}