import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import FoodDataRoutes from './routes/FoodDataRoutes.js';
import TMDBRoutes from './routes/TMDBRoutes.js';
import WgerRoutes from './routes/WgerRoutes.js';

import {errorController} from './controllers/errorController.js';

const app = express();

dotenv.config();
app.use(cors());



app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit: '30mb',extended:true}));

app.use('/user',userRoutes);
app.use('/posts',postRoutes);
app.use('/food',FoodDataRoutes);
app.use('/film', TMDBRoutes);
app.use('/exercise',WgerRoutes);

app.use(errorController);


const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>app.listen(PORT,()=>console.log(`Server is running on PORT: ${PORT}`)))
    .catch(()=>console.log(error));