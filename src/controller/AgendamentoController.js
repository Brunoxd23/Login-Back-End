"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoController = void 0;
const prisma_1 = require("../utils/prisma");
class AgendamentoController {
    // Listar todos os agendamentos
    async index(req, res) {
        try {
            const agendamentos = await prisma_1.prisma.agendamento.findMany();
            return res.json(agendamentos);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao listar agendamentos" });
        }
    }
    // Criar um novo agendamento
    async store(req, res) {
        const { data, horario, curso, sala, disciplina, tipoProva, suporte } = req.body;
        try {
            const agendamento = await prisma_1.prisma.agendamento.create({
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
    }
    // Atualizar um agendamento existente
    async update(req, res) {
        const { id } = req.params;
        const { data, horario, curso, sala, disciplina, tipoProva, suporte } = req.body;
        try {
            const agendamento = await prisma_1.prisma.agendamento.update({
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
    }
    // Deletar um agendamento
    async delete(req, res) {
        const { id } = req.params;
        try {
            await prisma_1.prisma.agendamento.delete({
                where: { id: parseInt(id, 10) }
            });
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao deletar agendamento" });
        }
    }
}
exports.AgendamentoController = AgendamentoController;
