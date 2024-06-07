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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var user_entity_1 = require("../../models/user.entity");
var token_entity_1 = require("../../models/token.entity");
var bcrypt_1 = require("bcrypt");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, userCheck, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        if (!name)
                            return [2 /*return*/, res.status(400).json({ error: 'O nome é obrigatório' })];
                        if (!email)
                            return [2 /*return*/, res.status(400).json({ error: 'O email é obrigatório' })];
                        if (!password)
                            return [2 /*return*/, res.status(400).json({ error: 'A senha é obrigatória' })
                                // Verifica se o email já está cadastrado
                            ];
                        return [4 /*yield*/, user_entity_1.default.findOneBy({ email: email })];
                    case 1:
                        userCheck = _b.sent();
                        if (userCheck)
                            return [2 /*return*/, res.status(400).json({ error: 'Email já cadastrado' })];
                        user = new user_entity_1.default();
                        user.name = name;
                        user.email = email;
                        // Gera a hash da senha com bcrypt - para não salvar a senha em texto puro
                        user.password = bcrypt_1.default.hashSync(password, 10);
                        return [4 /*yield*/, user.save()
                            // Não vamos retornar a hash da senha
                        ];
                    case 2:
                        _b.sent();
                        // Não vamos retornar a hash da senha
                        return [2 /*return*/, res.status(201).json({
                                id: user.id,
                                name: user.name,
                                email: user.email
                            })];
                }
            });
        });
    };
    AuthController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, passwordMatch, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email)
                            return [2 /*return*/, res.status(400).json({ error: 'O email é obrigatório' })];
                        if (!password)
                            return [2 /*return*/, res.status(400).json({ error: 'A senha é obrigatória' })];
                        return [4 /*yield*/, user_entity_1.default.findOneBy({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não encontrado' })];
                        passwordMatch = bcrypt_1.default.compareSync(password, user.password);
                        if (!passwordMatch)
                            return [2 /*return*/, res.status(401).json({ error: 'Senha inválida' })
                                // Remove todos os tokens antigos do usuário
                            ];
                        // Remove todos os tokens antigos do usuário
                        return [4 /*yield*/, token_entity_1.default.delete({ user: { id: user.id } })];
                    case 2:
                        // Remove todos os tokens antigos do usuário
                        _b.sent();
                        token = new token_entity_1.default();
                        // Gera um token aleatório
                        token.token = bcrypt_1.default.hashSync(Math.random().toString(36), 1).slice(-20);
                        // Define a data de expiração do token para 1 hora
                        token.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
                        // Gera um refresh token aleatório
                        token.refreshToken = bcrypt_1.default.hashSync(Math.random().toString(36), 1).slice(-20);
                        token.user = user;
                        return [4 /*yield*/, token.save()
                            // Adiciona o token em um cookie
                        ];
                    case 3:
                        _b.sent();
                        // Adiciona o token em um cookie
                        res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' }); // Aqui estamos definindo o cookie como HTTP Only, Secure e SameSite None
                        return [2 /*return*/, res.json({
                                token: token.token,
                                expiresAt: token.expiresAt,
                                refreshToken: token.refreshToken
                            })];
                }
            });
        });
    };
    AuthController.refresh = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var authorization, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorization = req.headers.authorization;
                        if (!authorization)
                            return [2 /*return*/, res.status(400).json({ error: 'O refresh token é obrigatório' })];
                        return [4 /*yield*/, token_entity_1.default.findOneBy({ refreshToken: authorization })];
                    case 1:
                        token = _a.sent();
                        if (!token)
                            return [2 /*return*/, res.status(401).json({ error: 'Refresh token inválido' })
                                // Verifica se o refresh token ainda é válido
                            ];
                        if (!(token.expiresAt < new Date())) return [3 /*break*/, 3];
                        return [4 /*yield*/, token.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(401).json({ error: 'Refresh token expirado' })];
                    case 3:
                        // Atualiza os tokens
                        token.token = bcrypt_1.default.hashSync(Math.random().toString(36), 1).slice(-20);
                        token.refreshToken = bcrypt_1.default.hashSync(Math.random().toString(36), 1).slice(-20);
                        token.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
                        return [4 /*yield*/, token.save()
                            // Adiciona o token em um cookie
                        ];
                    case 4:
                        _a.sent();
                        // Adiciona o token em um cookie
                        res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' }); // Aqui estamos definindo o cookie como HTTP Only, Secure e SameSite None
                        return [2 /*return*/, res.json({
                                token: token.token,
                                expiresAt: token.expiresAt,
                                refreshToken: token.refreshToken
                            })];
                }
            });
        });
    };
    AuthController.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var authorization, userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorization = req.headers.authorization;
                        if (!authorization)
                            return [2 /*return*/, res.status(400).json({ error: 'O token é obrigatório' })
                                // Verifica se o token existe
                            ];
                        return [4 /*yield*/, token_entity_1.default.findOneBy({ token: authorization })];
                    case 1:
                        userToken = _a.sent();
                        if (!userToken)
                            return [2 /*return*/, res.status(401).json({ error: 'Token inválido' })
                                // Remove o token
                            ];
                        // Remove o token
                        return [4 /*yield*/, userToken.remove()
                            // Remove o cookie
                        ];
                    case 2:
                        // Remove o token
                        _a.sent();
                        // Remove o cookie
                        res.clearCookie('token');
                        // Retorna uma resposta vazia
                        return [2 /*return*/, res.status(204).json()];
                }
            });
        });
    };
    return AuthController;
}());
exports.default = AuthController;
