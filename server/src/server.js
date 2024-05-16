import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes'

const app = express();
const Port = process.env.PORT || 5000;


const corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200
    }

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));

app.use('/server', routes);

app.use('/server/uploads', express.static('uploads'))



app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})
