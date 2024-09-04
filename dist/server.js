"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
var dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis de ambiente do arquivo .env apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV !== "production") {
    dotenv_1["default"].config();
}
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(routes_1.router);
// Usa a porta fornecida pelo ambiente ou 3000 como fallback
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("Server is running on port ".concat(PORT)); });
// Adicione um endpoint de teste
app.get("/", function (req, res) {
    res.json({ message: "API is working!" });
});
