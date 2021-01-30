export const Success_Equals = {
	rule: {
		field: '2',
		condition: 'eq',
		condition_value: 'bob',
	},
	data: ['damien-marley', 'naira-marley', 'bob'],
};

export const Success_Not_Equal_To = {
	rule: {
		field: '2',
		condition: 'neq',
		condition_value: 'douglas',
	},
	data: ['tobore', 'douglas', 'ejiro'],
};

export const Success_Greater_Than = {
	rule: {
		field: '4',
		condition: 'gt',
		condition_value: 4,
	},
	data: [1, 2, 3, 4, 5],
};

export const Success_Greater_Than_Or_Equal_To = {
	rule: {
		field: '1',
		condition: 'gte',
		condition_value: 'mack',
	},
	data: ['silas', 'mark', 'zack'],
};

export const Success_Contains = {
	rule: {
		field: '0',
		condition: 'contains',
		condition_value: 'n',
	},
	data: ['damien-marley'],
};

export const MissingField = {
	rule: {
		field: '8',
		condition: 'eq',
		condition_value: 'n',
	},
	data: ['the expanse'],
};

export const Failure_Contains = {
	rule: {
		field: '0',
		condition: 'contains',
		condition_value: ' ',
	},
	data: 'expanse',
};
