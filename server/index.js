import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit: '30mb',extended:true}));
app.use(cors());

const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>app.listen(PORT,()=>console.log(`Server is running on PORT: ${PORT}`)))
    .catch(()=>console.log(error));