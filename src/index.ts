import Storage from './storage';
import routes from './routes/index';
import ErrorHandle from './middleware';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const port = 3002;

const app: express.Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use(ErrorHandle);

// Routes
app.use('/', routes);
app.use('/images/thumbnails', express.static('images/thumbnails'));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

app.use(router);

app.listen(port, async (): Promise<void> => {
  await Storage.createThumbnailPath();
  console.log(`Server is listening on port ${port}`);
});

export default app;
