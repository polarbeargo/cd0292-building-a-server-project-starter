import fs from 'fs';
import Storage from '../storage';
import path from 'path';

interface ImageQuery {
  width?: string;
  height?: string;
  fileName?: string;
}

// create an async function using promise to check if the file exists
export const checkFile = (params: ImageQuery): Promise<boolean> => {
  if (!params.fileName || !params.width || !params.height) {
    return Promise.resolve(false);
  }
  return new Promise((resolve, reject) => {
    // check if the file exists
    const filePath = path.resolve(
      Storage.imageThumbnailPath,
      `${params.fileName}_${params.width}x${params.height}.jpg`
    );
    fs.access(filePath, fs.constants.F_OK, err => {
      // if the file exists
      if (!err) {
        // resolve the promise
        resolve(true);
      } else {
        // reject the promise
        reject(false);
      }
    });
  });
};

export default checkFile;
