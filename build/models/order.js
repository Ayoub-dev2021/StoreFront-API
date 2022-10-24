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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageOrders = void 0;
var database_1 = __importDefault(require("../database"));
var dashboard_1 = require("../services/dashboard");
var services = new dashboard_1.service();
var manageOrders = /** @class */ (function () {
    function manageOrders() {
        var _this = this;
        //Create new order
        this.createOrder = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'INSERT INTO orders (order_status, order_total, user_id) VALUES ($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, table.query(sql, [data.order_status, data.order_total, data.user_id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not add the new order - ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Show Specifc order info using order's id
        this.showOrder = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not show the order info - ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Show Specifc order info using order's id
        this.showOrdersByUser = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM orders WHERE user_id=($1) ';
                        return [4 /*yield*/, table.query(sql, [user_id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not show the orders - ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Show all orders list
        this.showAllOrders = function () { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, table.query(sql)];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not show the orders info - ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Edit specific order using order's id
        this.updateOrder = function (id, data) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'UPDATE orders SET order_status=$1, order_total=$2, user_id=$3 WHERE id=($4) RETURNING *';
                        return [4 /*yield*/, table.query(sql, [data.order_status, data.order_total, data.user_id, id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not update the order - ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Add product to specific order using order's id
        this.addOrderProduct = function (id, data) { return __awaiter(_this, void 0, void 0, function () {
            var table, getProduct, result, order, sql, productInOrder, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        getProduct = 'SELECT * FROM products WHERE id=($1)';
                        return [4 /*yield*/, table.query(getProduct, [data.product_id])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.showOrder(id)];
                    case 3:
                        order = _a.sent();
                        if (order.order_status != 'active') {
                            return [2 /*return*/, "The order's current status is ".concat(order.order_status, ", you have to \"Active\" the order first")];
                        }
                        sql = 'INSERT INTO order_products (product_id, product_quantity, order_id) VALUES ($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, table.query(sql, [data.product_id, data.product_quantity, id])];
                    case 4:
                        productInOrder = _a.sent();
                        table.release();
                        return [2 /*return*/, productInOrder.rows[0]];
                    case 5:
                        table.release();
                        return [2 /*return*/, 'The product is not exist'];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_6 = _a.sent();
                        throw new Error("Could not add product to the order- ".concat(err_6));
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        //Show product registerd in orders
        this.showProductInOrders = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM order_products WHERE product_id=($1)';
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not show the orderd product  info - ".concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.showAllOrderProducts = function () { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM order_products';
                        return [4 /*yield*/, table.query(sql)];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("Could not show the orderd product  info - ".concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Remove the product from the order using order_products id
        this.removeOrderProduct = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, orderProduct, sql, order, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        return [4 /*yield*/, services.productInOrder(id)];
                    case 2:
                        orderProduct = _a.sent();
                        if (orderProduct.order_status != 'active') {
                            table.release();
                            return [2 /*return*/, "The order's current status is ".concat(orderProduct.order_status, ", you have to \"Active\" the order first")];
                        }
                        sql = 'DELETE FROM order_products WHERE id=($1)';
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 3:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, "The item has been removed from the order successfully"];
                    case 4:
                        err_9 = _a.sent();
                        throw new Error("Could not remove the product from the order - ".concat(err_9));
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //Submit the order and change the Order_Status to "complete"
        this.submitTheOrder = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = "UPDATE orders SET order_status='complete' WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_10 = _a.sent();
                        throw new Error("Could not delete the order - ".concat(err_10));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Cancel the order and change the Order_Status to "cancelled"
        this.cancelTheOrder = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = "UPDATE orders SET order_status='cancelled' WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_11 = _a.sent();
                        throw new Error("Could not delete the order - ".concat(err_11));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Chnage order status to "active"
        this.reOpenTheOrder = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = "UPDATE orders SET order_status='active' WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_12 = _a.sent();
                        throw new Error("Could not delete the order - ".concat(err_12));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Get specific order using order's id, but using it as a validation
        this.checkOrder = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, checkOrder, result, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        checkOrder = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, table.query(checkOrder, [id])];
                    case 2:
                        result = _a.sent();
                        table.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_13 = _a.sent();
                        throw new Error("Could not check the order - ".concat(err_13));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Delete specific order using order's id
        this.deleteOrder = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, order, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        order = _a.sent();
                        table.release();
                        return [2 /*return*/, "The order with id:".concat(id, " is deleted successfully")];
                    case 3:
                        err_14 = _a.sent();
                        throw new Error("Could not delete the order - ".concat(err_14));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return manageOrders;
}());
exports.manageOrders = manageOrders;
