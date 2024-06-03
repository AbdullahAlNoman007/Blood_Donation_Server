import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { donorService } from "./donor.service";
import pick from "../../utility/pick";
import { donorFilterFields, donorPaginationFields } from "./donor.const";

const getDonor = catchAsync(async (req, res) => {

    const filter = pick(req.query, donorFilterFields);
    const options = pick(req.query, donorPaginationFields);

    const result = await donorService.getDonor(filter, options);

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Donors successfully found",
        meta: result.meta,
        data: result.data
    })
})

const createDonorRequest = catchAsync(async (req, res) => {

    const result = await donorService.createDonorRequest(req.user, req.body)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Request successfully made",
        data: result
    })
})
const getDonationRequest = catchAsync(async (req, res) => {

    const result = await donorService.getDonationRequestion(req.user)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Donation requests retrieved successfully",
        data: result
    })
})

const updateDonationRequest = catchAsync(async (req, res) => {

    const { requestId } = req.params
    const result = await donorService.updateDonationRequestion(requestId, req.body, req.user)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Donation request status successfully updated",
        data: result
    })
})

export const donorController = {
    getDonor,
    createDonorRequest,
    getDonationRequest,
    updateDonationRequest
}