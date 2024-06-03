import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Give a valid route!!!',
        error: {
            path: req.originalUrl,
            message: 'API NOT FOUND'
        },
    })
}

export default notFound;