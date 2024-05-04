import checkFile from '../utilities/CheckFile';
import express from 'express';
import Storage from './../storage';

const ImageProcessing: express.Router = express.Router();

ImageProcessing.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const validationMessage: null | string = await Storage.isValidated(
      request.query
    );
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    if (!(await checkFile(request.query))) {
      error = await Storage.createImageThumbnail(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path: null | string = await Storage.getPath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('Displaying image failed.');
    }
  }
);

export default ImageProcessing;
