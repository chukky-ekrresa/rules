export const Success_Contains = {
	rule: {
		field: 'friends',
		condition: 'contains',
		condition_value: 'Alex',
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		friends: ['Amos', 'Naomi', 'Alex'],
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};

export const Failure_Contains = {
	rule: {
		field: 'friends',
		condition: 'contains',
		condition_value: 'Bobbie',
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		friends: ['Amos', 'Naomi', 'Alex'],
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};

export const Success_Greater_Than = {
	rule: {
		field: 'age',
		condition: 'gt',
		condition_value: 32,
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};

export const Success_Greater_Than_Or_Equal_To = {
	rule: {
		field: 'missions',
		condition: 'gte',
		condition_value: 40,
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};

export const Success_Equals = {
	rule: {
		field: 'position',
		condition: 'eq',
		condition_value: 'Captain',
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};

export const Success_Not_Equal_To = {
	rule: {
		field: 'crew',
		condition: 'neq',
		condition_value: 'Tycho',
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};

export const fieldMissingFromData = {
	rule: {
		field: 'dob',
		condition: 'gte',
		condition_value: 30,
	},
	data: {
		name: 'James Holden',
		crew: 'Rocinante',
		age: 34,
		position: 'Captain',
		missions: 45,
	},
};
