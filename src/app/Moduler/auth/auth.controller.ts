import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { authService } from "./auth.service";


const login = catchAsync(async (req, res) => {
    const result = await authService.loginInDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result
    })
})

const changePassword = catchAsync(async (req, res) => {

    const result = await authService.changePassword(req.body, req.user)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password is changed successfully",
        data: result
    })

})



export const authController = {
    login,
    changePassword
}