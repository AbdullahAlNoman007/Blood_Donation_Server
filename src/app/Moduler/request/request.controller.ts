import httpStatus from "http-status"
import sendRespone from "../../utility/sendResponse"
import catchAsync from "../../utility/trycatch"
import { donationService } from "./request.service"

const createDonationRequest = catchAsync(async (req, res) => {

    const result = await donationService.createDonationRequest(req.user, req.body)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Donation Request is created successfully",
        data: result
    })
})

const getDonationRequest = catchAsync(async (req, res) => {

    const result = await donationService.getDonationRequestion(req.user)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Donation requests retrieved successfully",
        data: result
    })
})

const updateDonationRequest = catchAsync(async (req, res) => {

    const { requestId } = req.params
    const result = await donationService.updateDonationRequestion(requestId, req.body, req.user)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Donation request status successfully updated",
        data: result
    })
})

export const donationController = {
    createDonationRequest,
    getDonationRequest,
    updateDonationRequest
}