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
var cargo_entity_1 = require("../../models/cargo.entity");
var CargoController = /** @class */ (function () {
    function CargoController() {
    }
    CargoController.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, specs, weight, status, userId, carga;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, specs = _a.specs, weight = _a.weight, status = _a.status;
                        userId = req.headers.userId;
                        if (!userId)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não autenticado' })];
                        if (!specs) {
                            return [2 /*return*/, res.status(400).json({ error: 'Especificação da carga é obrigatória' })];
                        }
                        carga = new cargo_entity_1.default();
                        carga.specs = specs;
                        carga.weight = weight;
                        carga.status = status;
                        carga.userId = Number(userId);
                        return [4 /*yield*/, carga.save()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json(carga)];
                }
            });
        });
    };
    CargoController.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, cargas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.headers.userId;
                        if (!userId)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não autenticado' })];
                        return [4 /*yield*/, cargo_entity_1.default.find({ where: { userId: Number(userId) } })];
                    case 1:
                        cargas = _a.sent();
                        return [2 /*return*/, res.json(cargas)];
                }
            });
        });
    };
    CargoController.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, carga;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        userId = req.headers.userId;
                        if (!id || isNaN(Number(id))) {
                            return [2 /*return*/, res.status(400).json({ error: 'O id é obrigatório' })];
                        }
                        if (!userId)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não autenticado' })];
                        return [4 /*yield*/, cargo_entity_1.default.findOneBy({ id: Number(id), userId: Number(userId) })];
                    case 1:
                        carga = _a.sent();
                        return [2 /*return*/, res.json(carga)];
                }
            });
        });
    };
    CargoController.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, carga;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        userId = req.headers.userId;
                        if (!id || isNaN(Number(id))) {
                            return [2 /*return*/, res.status(400).json({ error: 'O id é obrigatório' })];
                        }
                        if (!userId)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não autenticado' })];
                        return [4 /*yield*/, cargo_entity_1.default.findOneBy({ id: Number(id), userId: Number(userId) })];
                    case 1:
                        carga = _a.sent();
                        if (!carga) {
                            return [2 /*return*/, res.status(404).json({ error: 'Carga não encontrada' })];
                        }
                        return [4 /*yield*/, carga.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(204).json()];
                }
            });
        });
    };
    CargoController.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, specs, weight, status, userId, carga;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, specs = _a.specs, weight = _a.weight, status = _a.status;
                        userId = req.headers.userId;
                        if (!id || isNaN(Number(id))) {
                            return [2 /*return*/, res.status(400).json({ error: 'O id é obrigatório' })];
                        }
                        if (!userId)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não autenticado' })];
                        return [4 /*yield*/, cargo_entity_1.default.findOneBy({ id: Number(id), userId: Number(userId) })];
                    case 1:
                        carga = _b.sent();
                        if (!carga) {
                            return [2 /*return*/, res.status(404).json({ error: 'Carga não encontrada' })];
                        }
                        carga.specs = specs !== null && specs !== void 0 ? specs : carga.specs;
                        carga.weight = weight !== null && weight !== void 0 ? weight : carga.weight;
                        carga.status = status !== null && status !== void 0 ? status : carga.status;
                        return [4 /*yield*/, carga.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.json(carga)];
                }
            });
        });
    };
    return CargoController;
}());
exports.default = CargoController;
