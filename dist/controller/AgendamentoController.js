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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoController = void 0;
const prisma_1 = require("../utils/prisma");
class AgendamentoController {
    // Listar todos os agendamentos
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agendamentos = yield prisma_1.prisma.agendamento.findMany();
                return res.json(agendamentos);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao listar agendamentos" });
            }
        });
    }
    // Criar um novo agendamento
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, horario, curso, sala, disciplina, tipoProva, suporte } = req.body;
            try {
                const agendamento = yield prisma_1.prisma.agendamento.create({
                    data: {
                        data: new Date(data),
                        horario: new Date(horario),
                        curso,
                        sala,
                        disciplina,
                        tipoProva,
                        suporte
                    }
                });
                return res.status(201).json(agendamento);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao criar agendamento" });
            }
        });
    }
    // Atualizar um agendamento existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { data, horario, curso, sala, disciplina, tipoProva, suporte } = req.body;
            try {
                const agendamento = yield prisma_1.prisma.agendamento.update({
                    where: { id: parseInt(id, 10) },
                    data: {
                        data: new Date(data),
                        horario: new Date(horario),
                        curso,
                        sala,
                        disciplina,
                        tipoProva,
                        suporte
                    }
                });
                return res.json(agendamento);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao atualizar agendamento" });
            }
        });
    }
    // Deletar um agendamento
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma_1.prisma.agendamento.delete({
                    where: { id: parseInt(id, 10) }
                });
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao deletar agendamento" });
            }
        });
    }
}
exports.AgendamentoController = AgendamentoController;
