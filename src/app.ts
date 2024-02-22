import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/ErrorHandle';
import routes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use(errorHandler);

// Routes
app.use('/', routes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK'});
});

export default app;
