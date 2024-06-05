"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorRouter = void 0;
const express_1 = __importDefault(require("express"));
const donor_controller_1 = require("./donor.controller");
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const donor_validation_1 = require("./donor.validation");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/donor-list', (0, auth_1.default)(client_1.userRole.Admin, client_1.userRole.Requester), donor_controller_1.donorController.getDonor);
router.delete('/:id', (0, auth_1.default)(client_1.userRole.Admin), donor_controller_1.donorController.deleteDonor);
router.put('/chage-status/:id', (0, auth_1.default)(client_1.userRole.Admin), (0, validationRequest_1.default)(donor_validation_1.changeStatusValidationSchema), donor_controller_1.donorController.changeStatus);
router.put('/update-donor/:id', (0, auth_1.default)(client_1.userRole.Admin, client_1.userRole.Donor), (0, validationRequest_1.default)(donor_validation_1.donorZodSchema.donorValidationSchema), donor_controller_1.donorController.updateDonor);
exports.donorRouter = router;
