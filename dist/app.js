"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const notFound_1 = __importDefault(require("./app/middleWare/notFound"));
const globalErrorHandle_1 = __importDefault(require("./app/middleWare/globalErrorHandle"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send({
        Message: `Blood Donation ...`
    });
});
app.use(globalErrorHandle_1.default);
app.use(notFound_1.default);
exports.default = app;
