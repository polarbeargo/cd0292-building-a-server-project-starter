import express from 'express';
import {ImageProcessingParallel} from './routes/ImageProcessingParallel';
import ImageProcessing from './routes/ImageProcessing';
import Storage from './storage';

const router = express.Router();

router.use('/api/ImageProcessing', ImageProcessing);
router.use('/api/ImageThumbnailPath', Storage.readThumbnailAbsPath);
router.use('/api/ImageProcessingParallel', ImageProcessingParallel);

export default router;
