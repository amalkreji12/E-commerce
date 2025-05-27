import 'dotenv/config.js';
import connectDB from './config/connection.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;
connectDB()


//Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => console.log('Server is running on port ' + port));