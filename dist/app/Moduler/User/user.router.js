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
const router = express_1.default.Router();
router.post('/register', (0, validationRequest_1.default)(user_validation_1.validationSchema.userValidationSchema), user_controller_1.userController.createUser);
router.get('/my-profile', (0, auth_1.default)(), user_controller_1.userController.getProfile);
router.put('/my-profile', (0, auth_1.default)(), (0, validationRequest_1.default)(user_validation_1.validationSchema.userUpdateSchema), user_controller_1.userController.updateProfile);
exports.userRouter = router;
