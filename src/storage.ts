import resizeImage from './utilities/Resize';
import checkFile from './utilities/CheckFile';
import path from 'path';
import fs from 'fs/promises';
import {Request, Response} from 'express';
import {CheckFile} from './utilities';

interface ImageQuery {
  width?: string;
  height?: string;
  filename?: string;
}

export default class Storage {
  static imageThumbnailPath = path.join('images', 'thumbnails');
  static imageAbsPath = 'images';

  static async readThumbnailAbsPath(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      console.log('Reading thumbnails from:', Storage.imageThumbnailPath);
      const imag = await fs.readdir(Storage.imageThumbnailPath);
      const thumbnails = imag.map(d => {
        console.log('Found thumbnail:', d);
        return `http://localhost:3002/${Storage.imageThumbnailPath}/${d}`;
      });
      res.status(200).send({
        thumbnails,
      });
    } catch (error) {
      console.error('Error reading thumbnails:', error);
      res.status(500).send({
        error: 'Failed to read thumbnails',
      });
    }
  }

  static async createImageThumbnail(
    params: ImageQuery
  ): Promise<null | string> {
    console.log(params.width, params.height, params.filename);
    if (!params.width || !params.height || !params.filename) {
      return null;
    }

    const imagePath = path.resolve(
      Storage.imageAbsPath,
      `${params.filename}.jpg`
    );
    const thumbnailPath = path.resolve(
      Storage.imageThumbnailPath,
      `${params.filename}_${params.width}x${params.height}.jpg`
    );

    console.log('Creating thumbnail');
    return await resizeImage({
      source: imagePath,
      target: thumbnailPath,
      width: Number(params.width),
      height: Number(params.height),
    });
  }

  static async isValidated(params: ImageQuery): Promise<null | string> {
    if (!params.width || !params.height || !params.filename) {
      return 'params is invalid';
    }

    if (!(await CheckFile(params))) {
      const availableFilenames: string = (await Storage.getImages()).join(', ');
      return `Please pass a valid filename. Validated filenames are: ${availableFilenames}.`;
    }

    const width = Number(params.width);
    const height = Number(params.height);

    if (
      width < 0 ||
      height < 0 ||
      Number.isNaN(width) ||
      Number.isNaN(height)
    ) {
      return 'Width & height is invalid';
    }

    return null;
  }
  static async getPath(params: ImageQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    const imagePath: string =
      params.width && params.height
        ? path.resolve(
            Storage.imageThumbnailPath,
            `${params.filename}_${params.width}x${params.height}.jpg`
          )
        : path.resolve(Storage.imageAbsPath, `${params.filename}.jpg`);

    try {
      await checkFile(params);
      return imagePath;
    } catch (err) {
      return null;
    }
  }

  static async getImages(): Promise<string[]> {
    try {
      return (await fs.readdir(Storage.imageAbsPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch (err) {
      return [];
    }
  }

  static async isThumbnailPath(params: ImageQuery): Promise<boolean> {
    if (!params.width || !params.height || !params.filename) {
      return false;
    }

    try {
      await checkFile(params);
      return true;
    } catch (err) {
      return false;
    }
  }

  static async createThumbnailPath(): Promise<void> {
    try {
      await fs.access(Storage.imageThumbnailPath);
    } catch {
      fs.mkdir(Storage.imageThumbnailPath);
    }
  }
}
