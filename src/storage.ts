import resizeImage from './utilities/Resize';
import checkFile from './utilities/CheckFile';
import path from 'path';
import fs from 'fs/promises';
import {Request, Response} from 'express';
import {CheckFile} from './utilities';

interface ImageQuery {
  width?: string;
  height?: string;
  fileName?: string;
}

export default class Storage {
  static imageThumbnailPath = path.resolve(__dirname, '../images/thumbnails');
  static imageAbsPath = path.resolve(__dirname, '../images');

  static async readThumbnailAbsPath(
    req: Request,
    res: Response
  ): Promise<void> {
    const imag = await fs.readdir(Storage.imageThumbnailPath);
    const thumbnails = imag.map(d => {
      return `http://localhost:3002/${d}`;
    });
    res.status(200).send({
      thumbnails,
    });
  }

  static async createImageThumbnail(
    params: ImageQuery
  ): Promise<null | string> {
    if (!params.width || !params.height || !params.fileName) {
      return null;
    }

    const imagePath = path.resolve(
      Storage.imageAbsPath,
      `${params.fileName}.jpg`
    );
    const thumbnailPath = path.resolve(
      Storage.imageThumbnailPath,
      `${params.fileName}_${params.width}x${params.height}.jpg`
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
    if (!params.width || !params.height || !params.fileName) {
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
    if (!params.fileName) {
      return null;
    }

    const imagePath: string =
      params.width && params.height
        ? path.resolve(
            Storage.imageThumbnailPath,
            `${params.fileName}_${params.width}x${params.height}.jpg`
          )
        : path.resolve(Storage.imageAbsPath, `${params.fileName}.jpg`);

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
    if (!params.width || !params.height || !params.fileName) {
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