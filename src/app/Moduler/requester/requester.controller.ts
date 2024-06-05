import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import pick from "../../utility/pick";
import { requesterService } from "./requester.service";
import { requesterFilterFields, requesterPaginationFields } from "./requester.const";

const getRequester = catchAsync(async (req, res) => {

    const filter = pick(req.query, requesterFilterFields);
    const options = pick(req.query, requesterPaginationFields);

    const result = await requesterService.getRequester(filter, options);

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Requester successfully found",
        meta: result.meta,
        data: result.data
    })
})

const deleteRequester = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await requesterService.deleteRequester(id)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Requester is deleted successfully",
        data: result
    })
})

const changeStatus = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await requesterService.changeStatus(id, req.body)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Requester's Status is changed successfully",
        data: result
    })
})

const updateRequester = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await requesterService.updateRequester(id, req.body, req.user)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Requester's Data is updated successfully",
        data: result
    })
})

export const requesterController = {
    getRequester,
    deleteRequester,
    changeStatus,
    updateRequester
}