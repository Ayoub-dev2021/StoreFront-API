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
var dashboard_1 = require("../../services/dashboard");
var user_info_1 = require("../user_info");
var order_1 = require("../order");
var product_1 = require("../product");
var database_1 = __importDefault(require("../../database"));
var services = new dashboard_1.service();
var manageUser = new user_info_1.ManageUsers();
var manageProduct = new product_1.manageProducts();
var manageOrder = new order_1.manageOrders();
describe('Services functions should be defined', function () {
    it('Show orderd product method should be defined', function () {
        expect(services.productInOrder).toBeDefined();
    });
    it('Show all orders with products', function () {
        expect(services.allOrdersWithDetails).toBeDefined();
    });
    it('Show order details with products method should be defined', function () {
        expect(services.singleOrderWithDetails).toBeDefined();
    });
});
describe('Services - Test All Functions', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //Create 'User', 'Product', 'Order' and 'Add product into order'
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser.createUser({
                            first_name: 'Mohamed',
                            last_name: 'Ali',
                            user_email: 'mohamed@mail.com',
                            user_password: 'pass123',
                            user_country: 'eg',
                            user_phone: 2020202020
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, manageProduct.createProduct({
                                id: 1,
                                product_name: 'item 1',
                                product_code: 'A01-12',
                                product_price: 200,
                                product_desc: 'item 1 description',
                                stock_level: 15
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, manageOrder.createOrder({
                                order_status: 'active',
                                order_total: 260,
                                user_id: 1
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, manageOrder.addOrderProduct(1, {
                                product_id: 1,
                                product_quantity: 10,
                                order_id: 1
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Delete Records and reset table ids to 1
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var table, sql1, sql2, sql3, sql4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageOrder.removeOrderProduct(1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, manageOrder.deleteOrder(1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, manageProduct.deleteProduct(1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, manageUser.deleteUser(1)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, database_1.default.connect()];
                    case 5:
                        table = _a.sent();
                        sql1 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
                        sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
                        sql3 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
                        sql4 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
                        return [4 /*yield*/, table.query(sql1)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, table.query(sql2)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, table.query(sql3)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, table.query(sql4)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "productInOrder" function
        it('Show One product info in an order - test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services.productInOrder(1).then(function (data) {
                            expect(data).toEqual({
                                id: 1,
                                order_status: 'active',
                                order_total: 260
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "showUsersList" function
        it('Show All Orders details with products - test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services.allOrdersWithDetails().then(function (data) {
                            expect(data).toEqual([
                                {
                                    id: 1,
                                    user_id: '1',
                                    product_id: '1',
                                    product_quantity: 10,
                                    order_status: 'active',
                                    order_total: 260
                                }
                            ]);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "updateUser" function
        it('Show order details with products - test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services.singleOrderWithDetails(1).then(function (data) {
                            expect(data).toEqual([
                                {
                                    id: 1,
                                    user_id: '1',
                                    product_id: '1',
                                    product_quantity: 10,
                                    order_status: 'active',
                                    order_total: 260
                                }
                            ]);
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
