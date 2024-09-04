"use strict";
exports.__esModule = true;
exports.authMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "Token not provided" });
    }
    var _a = authorization.split(" "), token = _a[1];
    try {
        var decoded = (0, jsonwebtoken_1.verify)(token, "secret");
        var id = decoded.id;
        req.userId = id;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token invalid" });
    }
}
exports.authMiddleware = authMiddleware;
