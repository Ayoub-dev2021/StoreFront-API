"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var users_info_1 = __importDefault(require("./handlers/users_info"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
// create an instance server
var app = (0, express_1.default)();
exports.app = app;
// HTTP request logger middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hellow Worl 🌍'
    });
});
(0, users_info_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, dashboard_1.default)(app);
