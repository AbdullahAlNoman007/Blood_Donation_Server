"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleWare/auth"));
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const request_validation_1 = require("./request.validation");
const request_controller_1 = require("./request.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/donation-request', (0, auth_1.default)(client_1.userRole.Requester), (0, validationRequest_1.default)(request_validation_1.donationZodSchema.donationSchema), request_controller_1.donationController.createDonationRequest);
router.get('/donation-request', (0, auth_1.default)(client_1.userRole.Admin, client_1.userRole.Donor, client_1.userRole.Requester), request_controller_1.donationController.getDonationRequest);
router.put('/donation-request/:requestId', request_controller_1.donationController.updateDonationRequest);
exports.donationRouter = router;
