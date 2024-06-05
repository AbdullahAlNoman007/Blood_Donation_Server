"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../Moduler/User/user.router");
const auth_router_1 = require("../Moduler/auth/auth.router");
const donor_router_1 = require("../Moduler/donor/donor.router");
const requester_router_1 = require("../Moduler/requester/requester.router");
const request_router_1 = require("../Moduler/request/request.router");
const router = express_1.default.Router();
const moduleRouters = [
    {
        path: '/user',
        route: user_router_1.userRouter
    },
    {
        path: '/auth',
        route: auth_router_1.authRouter
    },
    {
        path: '/donor',
        route: donor_router_1.donorRouter
    },
    {
        path: '/requester',
        route: requester_router_1.requesterRouter
    },
    {
        path: '/donation',
        route: request_router_1.donationRouter
    },
];
moduleRouters === null || moduleRouters === void 0 ? void 0 : moduleRouters.map(route => router.use(route.path, route.route));
exports.default = router;
