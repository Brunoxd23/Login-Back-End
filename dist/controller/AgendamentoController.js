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
exports.__esModule = true;
exports.AgendamentoController = void 0;
var prisma_1 = require("../utils/prisma");
var AgendamentoController = /** @class */ (function () {
    function AgendamentoController() {
    }
    // Listar todos os agendamentos
    AgendamentoController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var agendamentos, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.agendamento.findMany()];
                    case 1:
                        agendamentos = _a.sent();
                        return [2 /*return*/, res.json(agendamentos)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: "Erro ao listar agendamentos" })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Criar um novo agendamento
    AgendamentoController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, horario, curso, sala, disciplina, tipoProva, suporte, agendamento, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, data = _a.data, horario = _a.horario, curso = _a.curso, sala = _a.sala, disciplina = _a.disciplina, tipoProva = _a.tipoProva, suporte = _a.suporte;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma_1.prisma.agendamento.create({
                                data: {
                                    data: new Date(data),
                                    horario: new Date(horario),
                                    curso: curso,
                                    sala: sala,
                                    disciplina: disciplina,
                                    tipoProva: tipoProva,
                                    suporte: suporte
                                }
                            })];
                    case 2:
                        agendamento = _b.sent();
                        return [2 /*return*/, res.status(201).json(agendamento)];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ error: "Erro ao criar agendamento" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Atualizar um agendamento existente
    AgendamentoController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, data, horario, curso, sala, disciplina, tipoProva, suporte, agendamento, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, data = _a.data, horario = _a.horario, curso = _a.curso, sala = _a.sala, disciplina = _a.disciplina, tipoProva = _a.tipoProva, suporte = _a.suporte;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma_1.prisma.agendamento.update({
                                where: { id: parseInt(id, 10) },
                                data: {
                                    data: new Date(data),
                                    horario: new Date(horario),
                                    curso: curso,
                                    sala: sala,
                                    disciplina: disciplina,
                                    tipoProva: tipoProva,
                                    suporte: suporte
                                }
                            })];
                    case 2:
                        agendamento = _b.sent();
                        return [2 /*return*/, res.json(agendamento)];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ error: "Erro ao atualizar agendamento" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Deletar um agendamento
    AgendamentoController.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma_1.prisma.agendamento["delete"]({
                                where: { id: parseInt(id, 10) }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(204).send()];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: "Erro ao deletar agendamento" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AgendamentoController;
}());
exports.AgendamentoController = AgendamentoController;
