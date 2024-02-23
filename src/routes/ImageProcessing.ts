import fs from 'fs';
import path from 'path';
import {Request, Response} from 'express';
// import Checkfile and resizeImage from the utilities
import resizeImage from '../utilities/Resize';
import checkFile from '../utilities/CheckFile';

// create a async function to resizes the image from the request, Get height and width and file name from the request
export const ImageProcessing = async (req: Request, res: Response) => {
  // get the height and width from the request
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  // get the file name from the request
  const fileName = req.params.name;
  // get the file path
  const filePath = path.join(__dirname, `../../uploads/${fileName}`);
  // check if the file exists
  try {
    // Assemble the jpg image file name from width, height and file name
    const imagePath = `${fileName}_${width}_${height}.jpg`;
    // Assemble the resized jpg image file name from width, height and file name
    const resizedImagePath = `../../uploads/${fileName}_${width}_${height}.jpg`;
    const cachePath = await checkFile(filePath);
    // if cachePath is true use response send imagePath else response = resizeImage
    if (cachePath) {
      res
        .status(200)
        .sendFile(imagePath, {root: path.join(__dirname, '../../uploads')});
    } else {
      const bufferFileName = Buffer.from(fileName);
      const result = await resizeImage(bufferFileName, width, height);
      //   write the resized image to the resizedImagePath file path throw an error if it fails
      fs.writeFile(resizedImagePath, result, err => {
        if (err) {
          res.status(500).json({error: 'Internal Server Error'});
        }
      });
      // send the resized image in the response
      res.status(200).sendFile(resizedImagePath, {
        root: path.join(__dirname, '../../uploads'),
      });
    }
  } catch (err) {
    res.status(400).json({error: 'File does not exist'});
  }
};

export default ImageProcessing;
