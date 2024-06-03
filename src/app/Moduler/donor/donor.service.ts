import { Prisma, requestStatus } from "@prisma/client"
import { TdecodedData, Tpagination } from "../../interface"
import prisma from "../../utility/prismaClient"
import { TdonationRequest, TgetDonor } from "./donor.interface"
import { donorSearchFields } from "./donor.const"
import calculatePagination from "../../utility/pagination"
import AppError from "../../Error/AppError"
import httpStatus from "http-status"

const getDonor = async (params: TgetDonor, options: Tpagination) => {

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, ...rest } = params
    let andCondition: Prisma.UserWhereInput[] = []


    if (searchTerm) {
        const [bloodGroup, rhFactor] = searchTerm.split(' ')

        const validBloodGroups = ['A', 'B', 'AB', 'O'];
        const validRhFactors = ['positive', 'negative'];

        if (bloodGroup && rhFactor && validBloodGroups.includes(bloodGroup.toUpperCase()) && validRhFactors.includes(rhFactor.toLowerCase())) {

            let bloodType;

            if (rhFactor.toLowerCase() === 'positive') {
                bloodType = bloodGroup + '+'
            }
            else if (rhFactor.toLowerCase() === 'negative') {
                bloodType = bloodGroup + '-'
            }

            andCondition.push({
                OR: [
                    {
                        bloodType: {
                            contains: bloodType,
                            mode: 'insensitive'
                        }
                    }
                ]
            })

        }
        else {
            andCondition.push({
                OR: donorSearchFields.map(field => ({
                    [field]: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                }))
            })
        }

    }

    if (Object.keys(rest).length > 0) {
        if (Object.keys(rest).includes('availability')) {
            const value = Boolean(rest['availability'] === "false" ? '' : rest['availability'])
            andCondition.push({
                OR: [
                    {
                        availability: { equals: value }
                    }
                ]
            })
        }
        if (Object.keys(rest).includes('bloodType')) {

            let bloodType: string = '';
            const blood = rest['bloodType']?.split(' ')[0].toUpperCase();
            const type = rest['bloodType']?.split(' ')[1].toLowerCase();
            const validBloodGroups = ['A', 'B', 'AB', 'O'];

            if (validBloodGroups.includes((blood as string).toUpperCase())) {
                if (type === 'positive') {
                    bloodType = blood + '+'
                }
                else if (type === 'negative') {
                    bloodType = blood + '-'
                }
                if (type === 'positive' || type === 'negative') {
                    andCondition.push({
                        OR: [
                            {
                                bloodType: { equals: bloodType }
                            }
                        ]
                    })
                }
            }

        }
    }
    //console.dir(andCondition, { depth: 'infinity' });



    const whereCondition: Prisma.UserWhereInput = { AND: andCondition }

    const data = await prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            location: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        }
    })

    const total = await prisma.user.count();

    const meta = {
        total,
        page,
        limit
    }
    return { meta, data }
}

const createDonorRequest = async (decoded: TdecodedData, payload: TdonationRequest) => {

    await prisma.user.findUniqueOrThrow({
        where: {
            id: payload.donorId
        }
    })

    const data = {
        requesterId: decoded.userId,
        ...payload
    }
    const result = await prisma.request.create({
        data: data,
        select: {
            id: true,
            donorId: true,
            phoneNumber: true,
            dateOfDonation: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            requestStatus: true,
            createdAt: true,
            updatedAt: true,
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false,
                    userProfile: true
                }
            }
        }
    })

    return result

}

const getDonationRequestion = async (decoded: TdecodedData) => {
    const result = await prisma.request.findMany({
        where: {
            donorId: decoded.userId
        },
        select: {
            id: true,
            donorId: true,
            requesterId: true,
            phoneNumber: true,
            dateOfDonation: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            requestStatus: true,
            createdAt: true,
            updatedAt: true,
            requester: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true
                }
            }
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
export const donorService = {
    getDonor,
    createDonorRequest,
    getDonationRequestion,
    updateDonationRequestion
}