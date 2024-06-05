"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requesterRouter = void 0;
const express_1 = __importDefault(require("express"));
const requester_controller_1 = require("./requester.controller");
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const donor_validation_1 = require("../donor/donor.validation");
const requester_validation_1 = require("./requester.validation");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/requester-list', (0, auth_1.default)(client_1.userRole.Admin, client_1.userRole.Donor), requester_controller_1.requesterController.getRequester);
router.delete('/:id', (0, auth_1.default)(client_1.userRole.Admin), requester_controller_1.requesterController.deleteRequester);
router.put('/chage-status/:id', (0, auth_1.default)(client_1.userRole.Admin), (0, validationRequest_1.default)(donor_validation_1.changeStatusValidationSchema), requester_controller_1.requesterController.changeStatus);
router.put('/update-requester/:id', (0, auth_1.default)(client_1.userRole.Admin, client_1.userRole.Requester), (0, validationRequest_1.default)(requester_validation_1.requesterZodSchema.requesterUpdatedSchema), requester_controller_1.requesterController.updateRequester);
exports.requesterRouter = router;
