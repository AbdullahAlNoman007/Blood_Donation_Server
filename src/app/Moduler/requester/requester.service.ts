import { Prisma, accountStatus } from "@prisma/client"
import { Tpagination } from "../../interface"
import prisma from "../../utility/prismaClient"
import calculatePagination from "../../utility/pagination"
import { requesterSearchFields } from "./requester.const"
import { TgetRequester } from "./requester.interface"


const getRequester = async (params: TgetRequester, options: Tpagination) => {

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, ...rest } = params
    let andCondition: Prisma.RequesterWhereInput[] = []


    if (searchTerm) {
        andCondition.push({
            OR: requesterSearchFields.map((item) => ({
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

    const whereCondition: Prisma.RequesterWhereInput = { AND: andCondition }

    console.dir(whereCondition, { depth: 'infinity' });

    const data = await prisma.requester.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.requester.count({ where: whereCondition });

    const meta = {
        total,
        page,
        limit
    }

    return { meta, data }

}

const deleteRequester = async (id: string) => {

    const result = await prisma.$transaction(async (tx) => {
        await tx.request.deleteMany({
            where: {
                requesterId: id
            }
        })

        await tx.contactInformation.delete({
            where: {
                userId: id
            }
        })

        const requester = await tx.requester.delete({
            where: {
                userId: id
            }
        })

        await tx.user.delete({
            where: {
                id: id
            }
        })

        return requester
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

        const donor = await tx.donor.update({
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


export const requesterService = {
    getRequester,
    deleteRequester,
    changeStatus
}