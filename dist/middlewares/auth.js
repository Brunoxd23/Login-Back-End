"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token not provided" });
    }
    const [, token] = authorization.split(" ");
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || "secret");
        const { id } = decoded;
        req.userId = id; // userId é uma string, de acordo com a declaração nos tipos
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token invalid" });
    }
}
