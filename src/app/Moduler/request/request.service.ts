import httpStatus from "http-status"
import AppError from "../../Error/AppError"
import { TdecodedData, Tpagination } from "../../interface"
import prisma from "../../utility/prismaClient"
import { TdonationRequest } from "./request.interface"
import { Prisma, requestStatus } from "@prisma/client"
import calculatePagination from "../../utility/pagination"
import { donationSearchField } from "./request.const"

const createDonationRequest = async (decoded: TdecodedData, payload: TdonationRequest) => {

    const donor = await prisma.donor.findUniqueOrThrow({
        where: {
            id: payload.donorId
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
        ...payload,
        donorId: donor.userId
    }

    const result = await prisma.request.create({
        data: data
    })

    return result

}

const getDonationRequestion = async (params: { searchTerm?: string, requestStatus?: requestStatus }, options: Tpagination, decoded: TdecodedData) => {

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, requestStatus } = params
    let andCondition: Prisma.RequestWhereInput[] = []


    if (searchTerm) {
        andCondition.push({
            OR: donationSearchField.map((item) => ({
                [item]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (requestStatus) {
        andCondition.push({
            requestStatus: {
                equals: requestStatus
            }
        })
    }


    const whereCondition: Prisma.RequestWhereInput = { AND: andCondition }

    if (decoded.role === 'Admin') {

        const result = await prisma.request.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder
            },
        });

        return result
    }
    else {

        const roleKey = decoded.role === 'Donor' ? 'donorId' : 'requesterId';
        const includeRelation = decoded.role === 'Donor' ? 'requester' : 'donor';

        andCondition.push({
            [roleKey]: decoded.userId,
        })
        const result = await prisma.request.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder
            },
            include: {
                [includeRelation]: {
                    include: {
                        user: {
                            include: {
                                ContactInformation: true,
                            },
                        },
                    },
                },
            },
        });

        const finalResult = result.map(item => {
            const { [includeRelation]: { user: { ContactInformation } }, ...rest } = item;
            return rest.requestStatus === 'APPROVED'
                ? { ...rest, contactInformation: ContactInformation }
                : { ...rest };
        });

        return finalResult
    }
};


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