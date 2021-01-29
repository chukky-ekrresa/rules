export const conditionMissing = {
	rule: {
		field: 'missions',
		condition_value: 30,
	},
	data: {},
};

export const dataMissing = {
	rule: {
		field: 'missions',
		condition: 'eq',
		condition_value: 30,
	},
};

export const invalidConditionField = {
	rule: {
		field: 'missions',
		condition: 'lte',
		condition_value: 30,
	},
	data: 419,
};

export const invalidDataField = {
	rule: {
		field: 'missions',
		condition: 'eq',
		condition_value: 30,
	},
	data: 419,
};

export const invalidFieldType = {
	rule: {
		field: 23,
		condition: 'lte',
		condition_value: 30,
	},
	data: 419,
};

export const invalidRuleField = {
	rule: 23,
	data: '419',
};

export const ruleMissing = {
	data: {},
};
