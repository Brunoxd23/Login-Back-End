"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
console.log("Iniciando servidor...");
dotenv_1.default.config();
console.log("Variáveis de ambiente:", process.env);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
console.log("CORS configurado");
app.use(express_1.default.json());
console.log("Middleware JSON configurado");
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
});
const errorHandler = (err, req, res, next) => {
    console.error("Erro não tratado:", err);
    res
        .status(500)
        .json({ error: "Erro interno do servidor", details: err.message });
};
app.use(errorHandler);
app.use(routes_1.router);
console.log("Rotas configuradas");
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
exports.default = app;
