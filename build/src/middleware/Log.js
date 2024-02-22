"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// createlogger middleware function
function logger(req, res, next) {
    console.log(`Request URL: ${req.url}`);
    next();
}
exports.default = logger;
//# sourceMappingURL=Log.js.map