"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessing = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import Checkfile and resizeImage from the utilities
const Resize_1 = __importDefault(require("../utilities/Resize"));
const CheckFile_1 = __importDefault(require("../utilities/CheckFile"));
// create a async function to resizes the image from the request, Get height and width and file name from the request
const ImageProcessing = async (req, res) => {
    // get the height and width from the request
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    // get the file name from the request
    const fileName = req.params.name;
    // get the file path
    const filePath = path_1.default.join(__dirname, `../../uploads/${fileName}`);
    // check if the file exists
    try {
        // Assemble the jpg image file name from width, height and file name
        const imagePath = `${fileName}_${width}_${height}.jpg`;
        // Assemble the resized jpg image file name from width, height and file name
        const resizedImagePath = `../../uploads/${fileName}_${width}_${height}.jpg`;
        const cachePath = await (0, CheckFile_1.default)(filePath);
        // if cachePath is true use response send imagePath else response = resizeImage
        if (cachePath) {
            res
                .status(200)
                .sendFile(imagePath, { root: path_1.default.join(__dirname, '../../uploads') });
        }
        else {
            const bufferFileName = Buffer.from(fileName);
            const result = await (0, Resize_1.default)(bufferFileName, width, height);
            //   write the resized image to the resizedImagePath file path throw an error if it fails
            fs_1.default.writeFile(resizedImagePath, result, err => {
                if (err) {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
            // send the resized image in the response
            res.status(200).sendFile(resizedImagePath, {
                root: path_1.default.join(__dirname, '../../uploads'),
            });
        }
    }
    catch (err) {
        res.status(400).json({ error: 'File does not exist' });
    }
};
exports.ImageProcessing = ImageProcessing;
//# sourceMappingURL=ImageProcessing.js.map