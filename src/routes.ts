import express from 'express';
import ImageProcessing from './routes/ImageProcessing';
import resizeImage, {resizeImageParallel} from './utilities/Resize';
import Storage from './storage';

const router = express.Router();

router.get('/api/ImageProcessing', ImageProcessing);
router.get('/api/ImageThumbnailPath', Storage.readThumbnailAbsPath);

export default router;
