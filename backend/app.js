import 'dotenv/config.js';
import connectDB from './config/connection.js';
import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();


//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => console.log('Server is running on port ' + port));