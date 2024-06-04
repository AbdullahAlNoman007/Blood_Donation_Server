import { Prisma, accountStatus, requestStatus } from "@prisma/client"
import { TdecodedData, Tpagination } from "../../interface"
import prisma from "../../utility/prismaClient"
import { TdonationRequest, TgetDonor } from "./donor.interface"
import { donorSearchFields } from "./donor.const"
import calculatePagination from "../../utility/pagination"
import AppError from "../../Error/AppError"
import httpStatus from "http-status"


const getDonor = async (params: TgetDonor, options: Tpagination) => {

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, availability, ...rest } = params
    let andCondition: Prisma.DonorWhereInput[] = []


    if (searchTerm) {
        andCondition.push({
            OR: donorSearchFields.map((item) => ({
                [item]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(rest).length > 0) {
        andCondition.push({
            OR: Object.keys(rest).map(field => ({
                [field]: {
                    equals: (rest as any)[field]
                }
            }))
        })
    }
    if (availability) {
        andCondition.push({
            availability: {
                equals: availability.toLowerCase() === 'true' ? true : false
            }
        })
    }

    const whereCondition: Prisma.DonorWhereInput = { AND: andCondition }

    console.dir(whereCondition, { depth: 'infinity' });

    const data = await prisma.donor.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.donor.count({ where: whereCondition });

    const meta = {
        total,
        page,
        limit
    }

    return { meta, data }

}

const deleteDonor = async (id: string) => {

    const result = await prisma.$transaction(async (tx) => {
        await tx.request.deleteMany({
            where: {
                donorId: id
            }
        })

        await tx.contactInformation.delete({
            where: {
                userId: id
            }
        })

        const donor = await tx.donor.delete({
            where: {
                userId: id
            }
        })

        await tx.user.delete({
            where: {
                id: id
            }
        })

        return donor
    })

    return result
}

const changeStatus = async (id: string, payload: { status: accountStatus }) => {
    const result = await prisma.$transaction(async (tx) => {
        await tx.user.update({
            where: {
                id: id
            },
            data: {
                status: payload.status
            }
        })

        const donor = await tx.requester.update({
            where: {
                id: id
            },
            data: {
                status: payload.status
            }
        })

        return donor
    })

    return result
}

export const donorService = {
    getDonor,
    deleteDonor,
    changeStatus
}