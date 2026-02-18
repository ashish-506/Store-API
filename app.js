require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errMiddleware = require('./middleware/error-handler');

app.use(express.json());
const productRouter = require('./routes/products');

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1> <a href = "api/v1/products">product route</a>');
})

app.use('/api/v1/products',productRouter);
app.use(notFoundMiddleware);
app.use(errMiddleware);

const port = process.env.port || 3000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();