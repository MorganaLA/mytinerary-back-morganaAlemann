import 'dotenv/config.js';
import './config/database.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRouter from './router/index.router.js';

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: 'https://mytinerary-mla.netlify.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', indexRouter);
app.head('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => console.log('Server running on port: ' + PORT));

