"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Erro:', err.message);
    // Verifica o tipo de erro e define um status apropriado
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Dados inválidos fornecidos' });
    }
    // Adiciona outras verificações conforme necessário
    res.status(500).json({ message: 'Erro interno do servidor' });
};
exports.errorHandler = errorHandler;
