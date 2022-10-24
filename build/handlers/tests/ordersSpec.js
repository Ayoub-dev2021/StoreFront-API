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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../../app");
var user_info_1 = require("../../models/user_info");
var product_1 = require("../../models/product");
var database_1 = __importDefault(require("../../database"));
var manageUser = new user_info_1.ManageUsers();
var manageProduct = new product_1.manageProducts();
// create a request object
var request = (0, supertest_1.default)(app_1.app);
describe('Orders Endpoints response test', function () {
    //Create a "user" and "product" for tests
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //Create a user
                return [4 /*yield*/, manageUser.createUser({
                        first_name: 'John',
                        last_name: 'Stewart',
                        user_email: 'ayoub@email.com',
                        user_password: 'pass123',
                        user_country: 'ae',
                        user_phone: 101010101010
                    })
                    //Create a product
                ];
                case 1:
                    //Create a user
                    _a.sent();
                    //Create a product
                    return [4 /*yield*/, manageProduct.createProduct({
                            product_name: "item 1",
                            product_code: "A00-11",
                            product_price: 120,
                            product_desc: "item 1 desc",
                            stock_level: 15
                        })];
                case 2:
                    //Create a product
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('order list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/orders/list')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show one order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/orders/1')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show all orders by user id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/orders/user/1')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create order ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/orders')
                        .send({
                        user_id: 1,
                        order_status: "active",
                        order_total: 1500
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put('/api/orders/1')
                        .send({
                        user_id: 1,
                        order_status: "active",
                        order_total: 1100
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('add product to order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/orders/1/product')
                        .send({
                        product_id: 1,
                        product_qauntity: 5
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('submit the order and change the status to complete', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/orders/1/submit')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('cancel the order and change the status to cancelled', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/orders/1/cancel')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reopen the order and change the status to active', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/orders/1/active')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete('/api/orders/1')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    //Delete Records and reset table ids to 1
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var table, sql1, sql2, sql3, sql4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, manageUser.deleteUser(1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, manageProduct.deleteProduct(1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1.default.connect()];
                case 3:
                    table = _a.sent();
                    sql1 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
                    sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
                    sql3 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
                    sql4 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
                    return [4 /*yield*/, table.query(sql1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, table.query(sql2)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, table.query(sql3)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, table.query(sql4)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
