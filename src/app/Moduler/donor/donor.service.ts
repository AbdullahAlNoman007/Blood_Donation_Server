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

// const createDonorRequest = async (decoded: TdecodedData, payload: TdonationRequest) => {

//     await prisma.user.findUniqueOrThrow({
//         where: {
//             id: payload.donorId
//         }
//     })

//     const data = {
//         requesterId: decoded.userId,
//         ...payload
//     }
//     const result = await prisma.request.create({
//         data: data,
//         select: {
//             id: true,
//             donorId: true,
//             phoneNumber: true,
//             dateOfDonation: true,
//             hospitalName: true,
//             hospitalAddress: true,
//             reason: true,
//             requestStatus: true,
//             createdAt: true,
//             updatedAt: true,
//             donor: {
//                 select: {
//                     id: true,
//                     name: true,
//                     email: true,
//                     bloodType: true,
//                     location: true,
//                     availability: true,
//                     createdAt: true,
//                     updatedAt: true,

//                     userProfile: true
//                 }
//             }
//         }
//     })

//     return result

// }

// const getDonationRequestion = async (decoded: TdecodedData) => {
//     const result = await prisma.request.findMany({
//         where: {
//             donorId: decoded.userId
//         },
//         select: {
//             id: true,
//             donorId: true,
//             requesterId: true,
//             phoneNumber: true,
//             dateOfDonation: true,
//             hospitalName: true,
//             hospitalAddress: true,
//             reason: true,
//             requestStatus: true,
//             createdAt: true,
//             updatedAt: true,
//             requester: {
//                 select: {
//                     id: true,
//                     name: true,
//                     email: true,
//                     bloodType: true,
//                     location: true,
//                     availability: true
//                 }
//             }
//         }
//     })

//     return result

// }

// const updateDonationRequestion = async (id: string, payload: { status: requestStatus }, decoded: TdecodedData) => {

//     const request = await prisma.request.findUniqueOrThrow({
//         where: {
//             id: id
//         }
//     })
//     if (request.donorId !== decoded.userId) {
//         throw new AppError(httpStatus.BAD_REQUEST, "You can't update another donor's request")
//     }

//     const result = await prisma.request.update({
//         where: {
//             id: id
//         },
//         data: {
//             requestStatus: payload.status
//         }
//     })

//     return result

// }

export const donorService = {
    getDonor
}