"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRespone = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        statusCode: data.statusCode,
        message: data === null || data === void 0 ? void 0 : data.message,
        meta: data.meta,
        data: data === null || data === void 0 ? void 0 : data.data
    });
};
exports.default = sendRespone;
