import express from 'express';
import config from './config';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import bodyParser from 'body-parser';
import uploadRoute from './routes/uploadRoute';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch(error => console.log(error.reason));


const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});


app.listen(5000, () => { console.log("Server started at http://localhost:5000")});