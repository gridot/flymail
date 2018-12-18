
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import path from 'path';
import orderRouter from './server/routes/orderRoute';
import userRouter from './server/routes/userRoute';
import router from './server/routes/homeRoutes';




const app = express();
const swaggerDoc = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-token');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/', router);

const port = process.env.PORT || 5400;

app.listen(port, () => console.log(`Flymail is listening on port ${port}`));


export default app;