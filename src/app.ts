require('dotenv').config();
import 'express-async-errors';
import { celebrate } from 'celebrate';
import compression from 'compression';
import cors from 'cors';
import createHttpError from 'http-errors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { ErrorHandler } from './error';
import { NEW_RULE } from './validation';
import { responseHandler } from './response';

const app = express();

app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));

app.use(cors({}));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.post('/validate-rule', celebrate(NEW_RULE, { stripUnknown: true }), responseHandler);

app.get('/', (_req, res) => {
	res.status(200).json({
		message: 'My Rule-Validation API',
		status: 'success',
		data: {
			name: 'Ochuko Ekrresa',
			github: '@chukky-ekrresa',
			email: 'ekrresaochuko@gmail.com',
			mobile: '07036161822',
			twitter: '@chukky_ekrresa',
		},
	});
});

app.use((_req, _res, next) => {
	next(createHttpError(404, { message: 'Resource not found.' }));
});

app.use(ErrorHandler);

export default app;
