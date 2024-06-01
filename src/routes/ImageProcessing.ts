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
    // print hi
    console.log('hi');
    const validationMessage: null | string = await Storage.isValidated(
      request.query
    );

    console.log('hi3');
    if (!validationMessage) {
      response.send(validationMessage);
      return;
    }
    console.log('hi2');
    let error: null | string = '';

    if (!(await checkFile(request.query))) {
      error = await Storage.createImageThumbnail(request.query);
      console.log('check');
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
