"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const user_validation_1 = require("./user.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-admin', (0, auth_1.default)(client_1.userRole.Admin), (0, validationRequest_1.default)(user_validation_1.validationSchema.adminValidationSchema), user_controller_1.userController.createAdmin);
router.post('/create-donor', (0, validationRequest_1.default)(user_validation_1.validationSchema.donorValidationSchema), user_controller_1.userController.createDonor);
router.post('/create-requester', (0, validationRequest_1.default)(user_validation_1.validationSchema.requesterValidationSchema), user_controller_1.userController.createRequester);
exports.userRouter = router;
