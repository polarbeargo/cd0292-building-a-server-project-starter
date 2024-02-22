import express from 'express';
import ImageProcessing from './routes/ImageProcessing';

const router = express.Router();

router.get('/api/ImageProcessing', ImageProcessing);

export default router;
