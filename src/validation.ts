import { Segments, Joi } from 'celebrate';

export const NEW_RULE = {
	[Segments.BODY]: Joi.object().keys({
		rule: Joi.object()
			.keys({
				field: Joi.string().required(),
				condition: Joi.string().valid('eq', 'neq', 'gt', 'gte', 'contains').required(),
				condition_value: Joi.any(),
			})
			.required(),
		data: Joi.alternatives().try(Joi.array(), Joi.object(), Joi.string()).required(),
	}),
};
