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
exports.ManageUsers = exports.country = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var pepper = process.env.BYCRYPT_ADDSTRNG;
var saltRounds = process.env.SALT_ROUNDS;
var country;
(function (country) {
    country[country["eg"] = 0] = "eg";
    country[country["sa"] = 1] = "sa";
    country[country["ae"] = 2] = "ae";
    country[country["us"] = 3] = "us";
    country[country["kw"] = 4] = "kw";
    country[country["uk"] = 5] = "uk";
    country[country["fr"] = 6] = "fr";
    country[country["trk"] = 7] = "trk";
})(country = exports.country || (exports.country = {}));
var ManageUsers = /** @class */ (function () {
    function ManageUsers() {
        var _this = this;
        this.showUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, sqlResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 2:
                        sqlResult = _a.sent();
                        if (sqlResult.rows.length) {
                            table.release();
                            return [2 /*return*/, sqlResult.rows[0]];
                        }
                        else {
                            table.release();
                            return [2 /*return*/, "The user with id:".concat(id, " is not exist")];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Can't show the user info - ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.showUsersList = function () { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, sqlResult, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, table.query(sql)];
                    case 2:
                        sqlResult = _a.sent();
                        table.release();
                        return [2 /*return*/, sqlResult.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Can't show the list of users info - ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createUser = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var table, getEmail, checkEmail, sql, hash, sqlResult, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        getEmail = 'SELECT * FROM users WHERE user_email=($1)';
                        return [4 /*yield*/, table.query(getEmail, [data.user_email])];
                    case 2:
                        checkEmail = _a.sent();
                        if (!checkEmail.rows.length) return [3 /*break*/, 3];
                        table.release();
                        return [2 /*return*/, 'This email is already registered, please try onther email or try to login'];
                    case 3:
                        sql = 'INSERT INTO users ( first_name,last_name, user_email, user_password, user_address, user_phone, user_country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                        hash = bcrypt_1.default.hashSync(data.user_password + pepper, parseInt(saltRounds));
                        return [4 /*yield*/, table.query(sql, [
                                data.first_name,
                                data.last_name,
                                data.user_email,
                                hash,
                                data.user_address,
                                data.user_phone,
                                data.user_country
                            ])];
                    case 4:
                        sqlResult = _a.sent();
                        table.release();
                        return [2 /*return*/, sqlResult.rows[0]];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_3 = _a.sent();
                        throw new Error("Could not add the new user - ".concat(err_3));
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updateUser = function (id, data) { return __awaiter(_this, void 0, void 0, function () {
            var table, getUser, userInfo, savedPassword, hash, sql, sqlResult, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        getUser = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, table.query(getUser, [id])];
                    case 2:
                        userInfo = _a.sent();
                        if (!userInfo.rows.length) return [3 /*break*/, 4];
                        savedPassword = userInfo.rows[0].user_password;
                        if (data.user_password != null) {
                            hash = bcrypt_1.default.hashSync(data.user_password + pepper, parseInt(saltRounds));
                            savedPassword = hash;
                        }
                        sql = 'UPDATE users SET first_name= $1, last_name= $2, user_email=$3, user_password=$4, user_address=$5, user_phone = $6, user_country=$7 WHERE id= ($8) RETURNING *';
                        return [4 /*yield*/, table.query(sql, [
                                data.first_name,
                                data.last_name,
                                data.user_email,
                                savedPassword,
                                data.user_address,
                                data.user_phone,
                                data.user_country,
                                id
                            ])];
                    case 3:
                        sqlResult = _a.sent();
                        table.release();
                        return [2 /*return*/, sqlResult.rows[0]];
                    case 4:
                        table.release();
                        return [2 /*return*/, "The user with id:".concat(id, " is not exist")];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_4 = _a.sent();
                        throw new Error("Could not update the user info - ".concat(err_4));
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var table, getUser, userInfo, sql, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        getUser = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, table.query(getUser, [id])];
                    case 2:
                        userInfo = _a.sent();
                        if (!userInfo.rows.length) return [3 /*break*/, 4];
                        sql = 'DELETE FROM users WHERE id=($1)';
                        return [4 /*yield*/, table.query(sql, [id])];
                    case 3:
                        _a.sent();
                        table.release();
                        return [2 /*return*/, "The user with id:".concat(id, " is deleted successfully")];
                    case 4:
                        table.release();
                        return [2 /*return*/, "The user with id:".concat(id, " is not exist")];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        throw new Error("Could not delete the user - ".concat(err_5));
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.authenticate = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, currentPassword, userPassword, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        table = _a.sent();
                        sql = 'SELECT user_password FROM users WHERE user_email=($1)';
                        return [4 /*yield*/, table.query(sql, [email])];
                    case 2:
                        currentPassword = _a.sent();
                        if (currentPassword.rows.length) {
                            userPassword = currentPassword.rows[0];
                            if (bcrypt_1.default.compareSync(password + pepper, userPassword.user_password)) {
                                return [2 /*return*/, userPassword];
                            }
                            else {
                                return [2 /*return*/, 'Wrong password'];
                            }
                        }
                        else {
                            return [2 /*return*/, 'Wrong email'];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error('Could not authenticate the user');
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return ManageUsers;
}());
exports.ManageUsers = ManageUsers;
