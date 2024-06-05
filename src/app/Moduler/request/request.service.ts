import httpStatus from "http-status"
import AppError from "../../Error/AppError"
import { TdecodedData } from "../../interface"
import prisma from "../../utility/prismaClient"
import { TdonationRequest } from "./request.interface"
import { requestStatus } from "@prisma/client"

const createDonationRequest = async (decoded: TdecodedData, payload: TdonationRequest) => {

    const donor = await prisma.donor.findUniqueOrThrow({
        where: {
            userId: payload.donorId
        }
    })

    const requester = await prisma.requester.findUniqueOrThrow({
        where: {
            userId: decoded.userId
        }
    })

    if (donor.bloodType !== requester.bloodType) {
        throw new AppError(httpStatus.BAD_REQUEST, "Your blood type doesn't match with donor's blood type")
    }

    const contactInfo = await prisma.contactInformation.findUniqueOrThrow({
        where: {
            userId: decoded.userId
        }
    })

    const data = {
        requesterId: decoded.userId,
        phoneNumber: contactInfo.phone,
        ...payload
    }

    const result = await prisma.request.create({
        data: data
    })

    return result

}

const getDonationRequestion = async (decoded: TdecodedData) => {
    const result = await prisma.request.findMany({
        where: {
            donorId: decoded.userId
        }
    })

    return result

}

const updateDonationRequestion = async (id: string, payload: { status: requestStatus }, decoded: TdecodedData) => {

    const request = await prisma.request.findUniqueOrThrow({
        where: {
            id: id
        }
    })

    if (request.donorId !== decoded.userId) {
        throw new AppError(httpStatus.BAD_REQUEST, "You can't update another donor's request")
    }

    const result = await prisma.request.update({
        where: {
            id: id
        },
        data: {
            requestStatus: payload.status
        }
    })

    return result

}
export const donationService = {
    createDonationRequest,
    getDonationRequestion,
    updateDonationRequestion
}