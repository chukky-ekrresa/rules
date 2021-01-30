require('dotenv').config();
import 'express-async-errors';
import { celebrate } from 'celebrate';
import compression from 'compression';
import cors from 'cors';
import createHttpError, { TooManyRequests } from 'http-errors';
import express, { NextFunction, Response, Request } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { ErrorHandler } from './error';
import { NEW_RULE } from './validation';
import { responseHandler } from './response';

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
}

app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));

app.use(cors({}));
app.use(helmet());
app.use(compression());
app.use(express.json());

app.post(
	'/validate-rule',
	rateLimitRequests(),
	celebrate(NEW_RULE, { stripUnknown: true }),
	responseHandler
);

app.get('/', setCache, (_req, res) => {
	res.status(200).json({
		message: 'My Rule-Validation API.',
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

function rateLimitRequests() {
	return rateLimit({
		max: 1,
		windowMs: 60 * 1000,
		headers: true,
		skip: () => process.env.NODE_ENV === 'test',
		handler: () => {
			throw new TooManyRequests('You have exceeded the 100 validation requests in a minute limit.');
		},
	});
}

function setCache(_req: Request, res: Response, next: NextFunction) {
	// Cache for 30 days
	const period = 60 * 60 * 24 * 30;
	res.set('Cache-control', `public, max-age=${period}`);

	next();
}
