import config from "../../config"
import prisma from "../../utility/prismaClient"
import { adminPayload, donorPayload, requesterPayload, userUpdateData } from "./user.interface"
import bcrypt from 'bcrypt'
import { userRole } from "@prisma/client"

const createAdminIntoDB = async (payload: adminPayload) => {

    const hashPassword = await bcrypt.hash(payload.password, Number(config.hash_salt_round as string))

    const user = {
        email: payload.email,
        password: hashPassword,
        role: userRole.Admin
    }
    const result = await prisma.$transaction(async (tx) => {

        const createUser = await tx.user.create({
            data: user,
        })

        const adminData = {
            userId: createUser.id,
            name: payload.name,
            email: payload.email
        }
        const createAdmin = await tx.admin.create({
            data: adminData
        })

        const contactInfo = {
            userId: createUser.id,
            email: payload.email,
            phone: payload.phone,
            socialMedia: payload.socialMedia || config.const.social,
        }
        await tx.contactInformation.create({
            data: contactInfo
        })

        return createAdmin
    })

    return result
}

const createDonorIntoDB = async (payload: donorPayload) => {

    const hashPassword = await bcrypt.hash(payload.password, Number(config.hash_salt_round as string))

    const user = {
        email: payload.email,
        password: hashPassword,
        role: userRole.Admin
    }

    const result = await prisma.$transaction(async (tx) => {

        const createUser = await tx.user.create({
            data: user,
        })

        const donorData = {
            userId: createUser.id,
            name: payload.name,
            age: payload.age,
            email: payload.email,
            bloodType: payload.bloodType,
            location: payload.location,
            availability: payload.availability,
            lastDonationDate: payload.lastDonationDate
        }
        const createDonor = await tx.donor.create({
            data: donorData
        })

        const contactInfo = {
            userId: createUser.id,
            email: payload.email,
            phone: payload.phone,
            socialMedia: payload.socialMedia || config.const.social,
        }
        await tx.contactInformation.create({
            data: contactInfo
        })

        return createDonor
    })

    return result
}

const createRequesterIntoDB = async (payload: requesterPayload) => {

    const hashPassword = await bcrypt.hash(payload.password, Number(config.hash_salt_round as string))

    const user = {
        email: payload.email,
        password: hashPassword,
        role: userRole.Admin
    }

    const result = await prisma.$transaction(async (tx) => {

        const createUser = await tx.user.create({
            data: user,
        })

        const requesterData = {
            userId: createUser.id,
            name: payload.name,
            email: payload.email,
            bloodType: payload.bloodType,
            location: payload.location,
        }
        const createRequester = await tx.requester.create({
            data: requesterData
        })

        const contactInfo = {
            userId: createUser.id,
            email: payload.email,
            phone: payload.phone,
            socialMedia: payload.socialMedia || config.const.social,
        }
        await tx.contactInformation.create({
            data: contactInfo
        })

        return createRequester
    })

    return result
}



export const userService = {
    createAdminIntoDB,
    createDonorIntoDB,
    createRequesterIntoDB
}