import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/index.route.js';

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.get('/', (_req, res) => {
    res.json({
        message: 'VeriToeic Backend API is running...',
    })
})

app.use('/api', routes);

export default app;