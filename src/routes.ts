import express from 'express';
import ImageProcessing from './routes/ImageProcessing';
import resizeImage, {resizeImageParallel} from './utilities/Resize';
import Storage from './storage';

const router = express.Router();

router.use('/api/ImageProcessing', ImageProcessing);
router.use('/api/ImageThumbnailPath', Storage.readThumbnailAbsPath);

export default router;
