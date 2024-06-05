import { Prisma, accountStatus, requestStatus } from "@prisma/client"
import { TdecodedData, Tpagination } from "../../interface"
import prisma from "../../utility/prismaClient"
import { IcontactInformation, TgetDonor, donorUpdatePayload } from "./donor.interface"
import { donorSearchFields } from "./donor.const"
import calculatePagination from "../../utility/pagination"
import AppError from "../../Error/AppError"
import httpStatus from "http-status"



const getDonor = async (params: TgetDonor, options: Tpagination, decoded: TdecodedData) => {

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

    if (decoded?.role === 'Requester') {

        const requester = await prisma.requester.findUniqueOrThrow({
            where: {
                userId: decoded.userId
            }
        })

        andCondition.push({
            bloodType: requester.bloodType
        })

    }

    const whereCondition: Prisma.DonorWhereInput = { AND: andCondition }


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

const updateDonor = async (id: string, payload: donorUpdatePayload) => {
    const { email, phone, socialMedia, ...rest } = payload;

    await prisma.$transaction(async (tx) => {

        if (email) {
            await tx.user.update({
                where: { id },
                data: { email }
            });

            await tx.donor.update({
                where: { id },
                data: { email }
            });
        }


        const contactInfoPayload: IcontactInformation = {};
        if (email) contactInfoPayload.email = email;
        if (phone) contactInfoPayload.phone = phone;
        if (socialMedia) contactInfoPayload.socialMedia = socialMedia;

        if (Object.keys(contactInfoPayload).length > 0) {
            await tx.contactInformation.update({
                where: { id },
                data: contactInfoPayload
            });
        }

        if (Object.keys(rest).length > 0) {
            await tx.donor.update({
                where: { id },
                data: rest
            });
        }
    });

    return { message: "Donor's Data is Updated!!!" };
};

export const donorService = {
    getDonor,
    deleteDonor,
    changeStatus,
    updateDonor
}