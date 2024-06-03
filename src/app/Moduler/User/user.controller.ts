import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { userService } from "./user.service";


const createUser = catchAsync(async (req, res) => {


    const result = await userService.createUserIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result
    })
})
const getProfile = catchAsync(async (req, res) => {


    const result = await userService.getProfile(req.user)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile retrieved successfully",
        data: result
    })
})
const updateProfile = catchAsync(async (req, res) => {

    const result = await userService.updateProfile(req.user, req.body)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result
    })
})



export const userController = {
    createUser,
    getProfile,
    updateProfile
}