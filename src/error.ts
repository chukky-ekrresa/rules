import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export function ErrorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
	const message = 'Internal Server Error.';

	if (err.type === 'entity.parse.failed') {
		err.message = 'Invalid JSON payload passed.';
	}

	if (isCelebrateError(err)) {
		const errorObj = buildValidationError(err);
		err = { ...err, ...errorObj };
	}

	return res.status(err.status || 500).json({
		...(err.errors ? { errors: err.errors } : {}),
		message: err.message || message,
		status: 'error',
		data: null,
	});
}

function buildValidationError(error: CelebrateError) {
	const status = 400;
	const message = parseJoiErrors(error);

	return { message, status };
}

function parseJoiErrors(errors: CelebrateError) {
	let message = '';

	errors.details.forEach(segment => {
		segment.details.forEach(errorDetail => {
			message = errorDetail.message.replace(/"/g, '') + '.';
		});
	});

	return message;
}
