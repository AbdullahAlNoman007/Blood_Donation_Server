"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorRouter = void 0;
const express_1 = __importDefault(require("express"));
const donor_controller_1 = require("./donor.controller");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const donor_validation_1 = require("./donor.validation");
const router = express_1.default.Router();
router.get('/donor-list', donor_controller_1.donorController.getDonor);
router.post('/donation-request', (0, auth_1.default)(), (0, validationRequest_1.default)(donor_validation_1.donationSchema), donor_controller_1.donorController.createDonorRequest);
router.get('/donation-request', (0, auth_1.default)(), donor_controller_1.donorController.getDonationRequest);
router.put('/donation-request/:requestId', (0, auth_1.default)(), donor_controller_1.donorController.updateDonationRequest);
exports.donorRouter = router;
