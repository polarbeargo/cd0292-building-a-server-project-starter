import Storage from './storage';
import routes from './routes/index';
import ErrorHandle from './middleware';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

app.listen(port, async (): Promise<void> => {
  await Storage.createThumbnailPath();
  console.log(`Server is listening on port ${port}`);
});

export default app;
