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
var user_info_1 = require("../user_info");
var database_1 = __importDefault(require("../../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var manageUser = new user_info_1.ManageUsers();
describe('User model CRUD functions should be defined', function () {
    it('Show User method should be defined', function () {
        expect(manageUser.showUser).toBeDefined();
    });
    it('Show All Users method should be defined', function () {
        expect(manageUser.showUsersList).toBeDefined();
    });
    it('Create New User method should be defined', function () {
        expect(manageUser.createUser).toBeDefined();
    });
    it('Update User method should be defined', function () {
        expect(manageUser.updateUser).toBeDefined();
    });
    it('Delete a User method should be defined', function () {
        expect(manageUser.deleteUser).toBeDefined();
    });
    it('Authenticate method should be defined', function () {
        expect(manageUser.authenticate).toBeDefined();
    });
});
describe('Users Model - Test All CRUD actions', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //Delete Records and reset table ids to 1
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var table, sql1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql1 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
                        return [4 /*yield*/, table.query(sql1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "createUser" function
        it('Create New User test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser
                            .createUser({
                            first_name: 'Mohamed',
                            last_name: 'Ali',
                            user_email: 'mohamed@mail.com',
                            user_password: 'pass123',
                            user_country: 'eg',
                            user_phone: 2020202020
                        })
                            .then(function (userData) {
                            expect(userData.first_name).toEqual('Mohamed');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "showUser" function
        it('Show One User test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser.showUser(1).then(function (userData) {
                            expect(userData.user_email).toEqual('mohamed@mail.com');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "showUsersList" function
        it('Show All Users test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser.showUsersList().then(function (usersData) {
                            expect(usersData.length).toEqual(1);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "updateUser" function
        it('Update User method test', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser
                            .updateUser(1, {
                            first_name: 'Mohamed',
                            last_name: 'Ali',
                            user_email: 'mohamed@mail.com',
                            user_address: 'Moahmed Main Address'
                        })
                            .then(function (updatedUser) {
                            expect(updatedUser.user_address).toEqual('Moahmed Main Address');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test user "authenticate" function
        it('Authenticate User test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pepper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pepper = process.env.BYCRYPT_ADDSTRNG;
                        return [4 /*yield*/, manageUser.authenticate('mohamed@mail.com', 'pass123').then(function (result) {
                                expect(bcrypt_1.default.compareSync('pass123' + pepper, result.user_password)).toEqual(true);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        //Test the "deleteUser" function
        it('Delete User test method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manageUser.deleteUser(1).then(function (result) {
                            expect(result).toEqual('The user with id:1 is deleted successfully');
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
