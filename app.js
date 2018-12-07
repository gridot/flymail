
import express from 'express';
import bodyParser from 'body-parser';
import orderRouter from './server/routes/orderRoute';
import userRouter from './server/routes/userRoute';
import router from './server/routes/homeRoutes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/', router);

const port = process.env.PORT || 5400;
// "coverage": "nyc report --reporter=text-lcov | coveralls",

app.listen(port, () => console.log(`Flymail is listening on port ${port}`));


export default app;