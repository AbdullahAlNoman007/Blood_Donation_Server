import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { userService } from "./user.service";


const createAdmin = catchAsync(async (req, res) => {

    const result = await userService.createAdminIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Admin registered successfully",
        data: result
    })
})

const createDonor = catchAsync(async (req, res) => {

    const result = await userService.createDonorIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Donor registered successfully",
        data: result
    })
})
const createRequester = catchAsync(async (req, res) => {

    const result = await userService.createRequesterIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Requester registered successfully",
        data: result
    })
})



export const userController = {
    createAdmin,
    createDonor,
    createRequester
}