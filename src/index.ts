require('dotenv').config();
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const { NODE_ENV, PORT } = process.env;
const app = express();

app.use(morgan('dev', { skip: () => NODE_ENV === 'test' }));

app.use(cors({}));
app.use(helmet());
app.use(compression());
app.use(express.json());

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

app.listen(PORT, () => {
	console.log('listening on PORT 4000');
});
