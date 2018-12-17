
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import orderRouter from './server/routes/orderRoute';
import userRouter from './server/routes/userRoute';
import router from './server/routes/homeRoutes';




const app = express();
const swaggerDoc = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/', router);

const port = process.env.PORT || 5400;

app.listen(port, () => console.log(`Flymail is listening on port ${port}`));


export default app;