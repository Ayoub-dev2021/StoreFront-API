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
exports.userTokenoken = void 0;
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../../app");
var users_info_1 = require("../users_info");
var authinticat = new users_info_1.auth();
// create a request object
var request = (0, supertest_1.default)(app_1.app);
describe('Users Endpoints response test', function () {
    it('create users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/users').send({
                        first_name: 'Ali',
                        last_name: 'Hassan',
                        user_email: 'mohamed@gmail.com',
                        user_password: 'pass456',
                        user_country: 'eg',
                        user_phone: 2020202020
                    })];
                case 1:
                    response = _a.sent();
                    exports.userTokenoken = response.body.token;
                    expect(response.status).toBe(200);
                    expect(response.body.user.first_name).toEqual('Ali');
                    return [2 /*return*/];
            }
        });
    }); });
    it('users list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/api/users/list')
                        .set('Authorization', 'bearer ' + exports.userTokenoken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(Array.isArray(response.body)).toBeTrue;
                    expect(response.body[0].first_name).toEqual('Ali');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show one user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/api/users/1')
                        .set('Authorization', 'bearer ' + exports.userTokenoken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put('/api/users/1')
                        .set('Authorization', 'bearer ' + exports.userTokenoken)
                        .send({
                        first_name: 'Ali',
                        last_name: 'Hassan',
                        user_email: 'ali@mail.com',
                        user_address: 'Ali Main Address'
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.user_email).toBe('ali@mail.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it('update user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put('/api/users/1')
                        .set('Authorization', 'bearer ' + exports.userTokenoken)
                        .send({
                        first_name: 'Ali',
                        last_name: 'Hassan',
                        user_emai: 'ali@mail.com',
                        user_address: 'Ali Main Address'
                    })];
                case 1:
                    response = _a.sent();
                    console.log(response.text);
                    expect(response.status).toBe(400);
                    expect(response.text.includes('Bad request Error: Could not update the user info')).toBeTrue;
                    return [2 /*return*/];
            }
        });
    }); });
    it('authenticate user for login', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/users/login').set('Authorization', 'bearer ' + ' ')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    expect(response.text).toEqual('unauthorized');
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/api/users/1')
                        .set('Authorization', 'bearer ' + exports.userTokenoken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual('The user with id:1 is deleted successfully');
                    return [2 /*return*/];
            }
        });
    }); });
});
