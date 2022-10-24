"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var validations_1 = require("../middleware/validations");
var manageOrder = new order_1.manageOrders();
var showOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.showOrder(req.params.id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showOrdersList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.showAllOrders()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showOrderstByUserID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.showOrdersByUser(req.params.id)];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addNewOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.createOrder(req.body)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.updateOrder(req.params.id, req.body)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.deleteOrder(req.params.id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(400);
                res.json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var closeOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.submitTheOrder(req.params.id)];
            case 1:
                order = _a.sent();
                res.json({
                    message: 'The order is complete',
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400);
                res.json(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var reOpenOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.reOpenTheOrder(req.params.id)];
            case 1:
                order = _a.sent();
                res.json({
                    message: 'The order is active',
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.status(400);
                res.json(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var cancelTheOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.cancelTheOrder(req.params.id)];
            case 1:
                order = _a.sent();
                res.json({
                    message: 'The order is cancelled',
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                res.status(400);
                res.json(err_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addProductToOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.addOrderProduct(req.params.id, req.body)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                res.status(400);
                res.json(err_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var removeProductFromOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.removeOrderProduct(req.params.id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                res.status(400);
                res.json(err_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showOrderProductsList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.showAllOrderProducts()];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_12 = _a.sent();
                res.status(400);
                res.json(err_12);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showProductAddedToOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manageOrder.showProductInOrders(req.params.id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_13 = _a.sent();
                res.status(400);
                res.json(err_13);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var ordersRouts = function (app) {
    app.get('/api/orders/list', showOrdersList);
    app.get('/api/orders/:id', validations_1.OrderIsExist, showOrder); //order id
    app.get('/api/orders/user/:id', showOrderstByUserID); //user id
    app.post('/api/orders', addNewOrder);
    app.put('/api/orders/:id', validations_1.OrderIsExist, updateOrder); //order id
    app.delete('/api/orders/:id', validations_1.OrderIsExist, deleteOrder); //order id
    app.put('/api/orders/:id/submit', validations_1.OrderIsExist, closeOrder); //order id then '/submit'
    app.put('/api/orders/:id/cancel', validations_1.OrderIsExist, cancelTheOrder); //order id then '/cancel'
    app.put('/api/orders/:id/active', validations_1.OrderIsExist, reOpenOrder); //order id then '/active'
    app.post('/api/orders/:id/product', validations_1.OrderIsExist, addProductToOrder); //order id then '/product' (send product data in the request body)
    app.get('/api/order_products/list', showOrderProductsList);
    app.get('/api/order_products/:id', showProductAddedToOrders); //ordered product id
    app.delete('/api/order_products/:id', removeProductFromOrder); //ordered product id
};
exports.default = ordersRouts;
