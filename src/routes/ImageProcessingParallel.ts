import express from 'express';
import {resizeImagesInParallel} from '../utilities/Resize';
import path from 'path';
import Storage from '../storage';

export const ImageProcessingParallel: express.Router = express.Router();

ImageProcessingParallel.get('/', async (req, res) => {
  try {
    const {width, height, filename} = req.query;
    const imagePath = path.join(Storage.imageAbsPath, `${filename}.jpg`);
    const thumbnailPath = path.join(
      Storage.imageThumbnailPath,
      `${filename}_${width}x${height}.jpg`
    );
    console.log(thumbnailPath, imagePath);
    const tasks = [
      {
        width: Number(width),
        height: Number(height),
        source: imagePath,
        target: thumbnailPath,
      },
      {
        width: 800,
        height: 600,
        source: 'images/santamonica.jpg',
        target: 'images/thumbnails/santamonica_800x600.jpg',
      },
      // Add more tasks as needed
    ];

    await resizeImagesInParallel({tasks, concurrency: 2});
    res.status(200).send('Images resized successfully');
  } catch (error) {
    console.error('Error resizing images:', error);
    res.status(500).send('Error resizing images');
    return;
  }
});
