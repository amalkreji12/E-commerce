import 'dotenv/config.js';
import connectDB from './config/connection.js';
import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();


//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/user', userRouter);



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => console.log('Server is running on port ' + port));