import express from 'express';
import cors from 'cors';
import index from './routes/index.js';
import mongoose from 'mongoose';
import setEnv from './bin/setEnv.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', index)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

setEnv();

await mongoose.connect(process.env.MONGO_URI);
