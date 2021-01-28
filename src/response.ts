import { Request } from 'express';
import { BadRequest } from 'http-errors';
import nestedProperty from 'nested-property';

import { ApiResponse } from './types';

export async function responseHandler(req: Request, res: ApiResponse) {
	const { data, rule } = req.body;
	const stringsLength = rule.field.split('.').length;

	// checks if nesting level is greater than two
	if (stringsLength > 3) {
		throw new BadRequest(`field ${rule.field} exceeds nesting level of two`);
	}

	let fieldExists: boolean;
	let fieldValue: any;
	// data can be an object, an array or a string

	if (Array.isArray(data) || typeof data === 'string') {
		fieldExists = data[rule.field];
		fieldValue = data[rule.field];
	} else {
		fieldExists = nestedProperty.has(data, rule.field);
		fieldValue = nestedProperty.get(data, rule.field);
	}

	if (!fieldExists) {
		throw new BadRequest(`field ${rule.field} is missing from data.`);
	}

	let isValid = false;

	switch (rule.condition) {
		case 'contains':
			if (Array.isArray(fieldValue) || typeof data === 'string') {
				isValid = fieldValue.includes(rule.field);
			}
			break;
		case 'eq':
			isValid = fieldValue === rule.condition_value;
			break;
		case 'gt':
			isValid = fieldValue > rule.condition_value;
			break;
		case 'gte':
			isValid = fieldValue >= rule.condition_value;
			break;
		case 'neq':
			isValid = fieldValue !== rule.condition_value;
			break;

		default:
			throw new BadRequest(`condition ${rule.condition} is not handled by the API.`);
	}

	const message = isValid
		? `field ${rule.field} successfully validated.`
		: `field ${rule.field} failed validation.`;
	const statusCode = isValid ? 200 : 400;
	const status = isValid ? 'success' : 'error';

	res.status(statusCode).json({
		message,
		status,
		data: {
			validation: {
				error: !isValid,
				field: rule.field,
				field_value: nestedProperty.get(data, rule.field),
				condition: rule.condition,
				condition_value: rule.condition_value,
			},
		},
	});
}
