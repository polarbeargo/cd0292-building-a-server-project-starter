"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=ErrorHandle.js.map