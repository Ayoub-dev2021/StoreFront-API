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
var order_1 = require("../order");
var user_info_1 = require("../user_info");
var product_1 = require("../product");
var manageOrder = new order_1.manageOrders();
var manageUser = new user_info_1.ManageUsers();
var manageProduct = new product_1.manageProducts();
describe('Order CRUD functions should be defined', function () {
    it('Show Order method should be defined', function () {
        expect(manageOrder.showOrder).toBeDefined();
    });
    it('Show All Orders method should be defined', function () {
        expect(manageOrder.showAllOrders).toBeDefined();
    });
    it('Show All Orders by User id method should be defined', function () {
        expect(manageOrder.showOrdersByUser).toBeDefined();
    });
    it('Create New Order method should be defined', function () {
        expect(manageOrder.createOrder).toBeDefined();
    });
    it('Update Order method should be defined', function () {
        expect(manageOrder.updateOrder).toBeDefined();
    });
    it('Delete an Order method should be defined', function () {
        expect(manageOrder.deleteOrder).toBeDefined();
    });
    it('Add Product to the Order method should be defined', function () {
        expect(manageOrder.addOrderProduct).toBeDefined();
    });
    it('Remove Product from the Order method should be defined', function () {
        expect(manageOrder.removeOrderProduct).toBeDefined();
    });
    it('Cancel the Order method should be defined', function () {
        expect(manageOrder.cancelTheOrder).toBeDefined();
    });
    it('Complete the Order method should be defined', function () {
        expect(manageOrder.submitTheOrder).toBeDefined();
    });
    it('ReOpen the Order method should be defined', function () {
        expect(manageOrder.reOpenTheOrder).toBeDefined();
    });
});
describe('Order Model - Test All CRUD actions', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //Test the "createOrder" function
        it('Create New Order test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser.createUser({
                            first_name: 'Sara',
                            last_name: 'Adam',
                            user_email: 'Sara@email.com',
                            user_password: 'pass123',
                            user_country: 'ae',
                            user_phone: 101010101010
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, manageOrder
                                .createOrder({
                                order_status: 'active',
                                order_total: 260,
                                user_id: 2
                            })
                                .then(function (orderData) {
                                expect(orderData).toEqual({
                                    order_status: 'active',
                                    order_total: 260,
                                    user_id: '2',
                                    id: 1
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "showOrder" function
        it('Show One Order test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.showOrder(1).then(function (orderData) {
                            expect(orderData).toEqual({
                                id: 1,
                                order_status: 'active',
                                order_total: 260,
                                user_id: '2'
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "showAllOrders" function
        it('Show All Orders test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.showAllOrders().then(function (ordersData) {
                            expect(ordersData).toEqual([
                                {
                                    id: 1,
                                    order_status: 'active',
                                    order_total: 260,
                                    user_id: '2'
                                }
                            ]);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "showOrdersByUser" function
        it('Show All Orders by user id method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.showOrdersByUser(2).then(function (ordersData) {
                            expect(ordersData).toEqual([
                                {
                                    id: 1,
                                    order_status: 'active',
                                    order_total: 260,
                                    user_id: '2'
                                }
                            ]);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "updateOrder" function
        it('Update Order method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder
                            .updateOrder(1, {
                            order_status: 'active',
                            order_total: 300,
                            user_id: '2'
                        })
                            .then(function (updatedOrder) {
                            expect(updatedOrder).toEqual({
                                order_status: 'active',
                                order_total: 300,
                                user_id: '2',
                                id: 1
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "sbmitOrder" function
        it('Submit Order method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.submitTheOrder(1).then(function (submittedOrder) {
                            expect(submittedOrder).toEqual({
                                order_status: 'complete',
                                order_total: 300,
                                user_id: '2',
                                id: 1
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "cancelTheOrder" function
        it('Cancel Order method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.cancelTheOrder(1).then(function (cancelledOrder) {
                            expect(cancelledOrder).toEqual({
                                order_status: 'cancelled',
                                order_total: 300,
                                user_id: '2',
                                id: 1
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "reOpenOrder" function
        it('ReOpen Order method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.reOpenTheOrder(1).then(function (reOpenOrder) {
                            expect(reOpenOrder).toEqual({
                                order_status: 'active',
                                order_total: 300,
                                user_id: '2',
                                id: 1
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "addOrderProduct" function
        it('Add Product to the Order method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageProduct.createProduct({
                            product_name: 'item 2',
                            product_code: 'B00-12',
                            product_price: 150,
                            product_desc: 'item 2 description',
                            stock_level: 10
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, manageOrder
                                .addOrderProduct(1, {
                                product_id: 2,
                                product_quantity: 10,
                                order_id: 1
                            })
                                .then(function (result) {
                                expect(result).toEqual({
                                    id: 1,
                                    product_id: '2',
                                    product_quantity: 10,
                                    order_id: '1'
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "removeOrderProduct" function
        it('Remove Product from the Order method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.removeOrderProduct(1).then(function (result) {
                            expect(result).toEqual('The item has been removed from the order successfully');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "deleteOrder" function
        it('Delete Order test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.deleteOrder(1).then(function (result) {
                            expect(result).toEqual('The order with id:1 is deleted successfully');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
