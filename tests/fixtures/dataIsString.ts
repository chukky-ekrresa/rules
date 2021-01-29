export const Success_Equals = {
	rule: {
		field: '0',
		condition: 'eq',
		condition_value: 'd',
	},
	data: 'damien-marley',
};

export const Success_Not_Equal_To = {
	rule: {
		field: '4',
		condition: 'neq',
		condition_value: 'd',
	},
	data: 'damien-marley',
};

export const Success_Greater_Than = {
	rule: {
		field: '5',
		condition: 'gt',
		condition_value: 'd',
	},
	data: 'damien-marley',
};

export const Success_Greater_Than_Or_Equal_To = {
	rule: {
		field: '5',
		condition: 'gte',
		condition_value: 'n',
	},
	data: 'damien-marley',
};

export const Success_Contains = {
	rule: {
		field: '5',
		condition: 'contains',
		condition_value: 'n',
	},
	data: 'damien-marley',
};

export const MissingField = {
	rule: {
		field: '8',
		condition: 'eq',
		condition_value: 'n',
	},
	data: 'expanse',
};

export const Failure_Greater_Than = {
	rule: {
		field: '1',
		condition: 'gt',
		condition_value: 'z',
	},
	data: 'expanse',
};
