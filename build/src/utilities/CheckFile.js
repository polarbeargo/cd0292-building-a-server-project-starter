"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFile = void 0;
// import the fs module
const fs_1 = __importDefault(require("fs"));
// create an async function using promise to check if the file exists
const checkFile = (filePath) => {
    // return a promise
    return new Promise((resolve, reject) => {
        // check if the file exists
        fs_1.default.access(filePath, fs_1.default.constants.F_OK, err => {
            // if the file exists
            if (!err) {
                // resolve the promise
                resolve(true);
            }
            else {
                // reject the promise
                reject(false);
            }
        });
    });
};
exports.checkFile = checkFile;
exports.default = exports.checkFile;
//# sourceMappingURL=CheckFile.js.map