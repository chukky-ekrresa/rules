import supertest from 'supertest';
import { expect } from 'chai';
import nestedProperty from 'nested-property';
import 'mocha';

import app from '../src/app';
import * as InvalidRequests from './fixtures/misc';
import * as RequestDataObj from './fixtures/dataIsObject';
import * as RequestDataString from './fixtures/dataIsString';
import * as RequestDataArray from './fixtures/dataIsArray';

const request = supertest(app);

function assertDataValidated(body: any, data: any, rule: any) {
	expect(body.field).to.equal(rule.field);
	expect(body.field_value).to.deep.equal(nestedProperty.get(data, rule.field));
	expect(body.condition).to.equal(rule.condition);
	expect(body.condition_value).to.equal(rule.condition_value);
}

describe('Rules Validation API', () => {
	it('should return my details with status code of 200', async function () {
		const { status, body } = await request.get('/');

		expect(status).to.equal(200);
		expect(body.data.name).to.equal('Ochuko Ekrresa');
		expect(body.data.github).to.equal('@chukky-ekrresa');
		expect(body.data.email).to.equal('ekrresaochuko@gmail.com');
		expect(body.data.mobile).to.equal('07036161822');
	});

	it('should return status code of 404 on non-existent routes', async function () {
		const { status, body } = await request.get('/heyo');

		expect(status).to.equal(404);
		expect(body.message).to.match(/(?=.*not found)(?=.*\.$)/i);
		expect(body.data).to.equal(null);
	});

	describe('Request Validation', () => {
		it('should respond with "condition is required."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.conditionMissing);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*condition)(?=.*required)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});

		it('should respond with "data is required."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.dataMissing);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*data)(?=.*required)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});

		it('should respond with "rule is required."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.ruleMissing);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*rule)(?=.*required)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});

		it('should respond with "rule should be of type object."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.invalidRuleField);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*rule)(?=.*object)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});

		it('should respond with "data must be one of [array, object, string]."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.invalidDataField);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*data)(?=.*object)(?=.*array)(?=.*string)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});

		it('should respond with "rule.condition should be one of ["eq","neq","gt","gte","contains"]"', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.invalidConditionField);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*rule\.condition)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});

		it('should respond with "rule.field should be of type string"', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(InvalidRequests.invalidFieldType);

			expect(status).to.equal(400);
			expect(body.message).to.match(/(?=.*rule\.field)(?=.*string)(?=.*\.$)/i);
			expect(body.data).to.equal(null);
		});
	});

	describe('Request Evaluation: where request.data is an object', () => {
		it('given condition "contains", should respond with status "success"', async function () {
			const { data, rule } = RequestDataObj.Success_Contains;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.Success_Contains);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "eq", should respond with status "success"', async function () {
			const { data, rule } = RequestDataObj.Success_Equals;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.Success_Equals);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "neq", should respond with status "success"', async function () {
			const { data, rule } = RequestDataObj.Success_Not_Equal_To;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.Success_Not_Equal_To);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gt", should respond with status "success"', async function () {
			const { data, rule } = RequestDataObj.Success_Greater_Than;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.Success_Greater_Than);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gte", should respond with status "success"', async function () {
			const { data, rule } = RequestDataObj.Success_Greater_Than_Or_Equal_To;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.Success_Greater_Than_Or_Equal_To);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "contains", should respond with status "error"', async function () {
			const { data, rule } = RequestDataObj.Failure_Contains;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.Failure_Contains);

			expect(status).to.equal(400);
			expect(body.status).to.match(/error/i);
			expect(body.data.validation.error).to.equal(true);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('should respond with message: "field dob is missing from data."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataObj.fieldMissingFromData);

			expect(status).to.equal(400);
			expect(body.status).to.equal('error');
			expect(body.message).to.equal('field dob is missing from data.');
			expect(body.data).to.equal(null);
		});
	});

	describe('Request Evaluation: where request.data is a string', () => {
		it('given condition "eq", should respond with status "success"', async function () {
			const { data, rule } = RequestDataString.Success_Equals;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.Success_Equals);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "neq", should respond with status "success"', async function () {
			const { data, rule } = RequestDataString.Success_Not_Equal_To;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.Success_Not_Equal_To);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "contains", should respond with status "success"', async function () {
			const { data, rule } = RequestDataString.Success_Contains;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.Success_Contains);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gt", should respond with status "success"', async function () {
			const { data, rule } = RequestDataString.Success_Greater_Than;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.Success_Greater_Than);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gte", should respond with status "success"', async function () {
			const { data, rule } = RequestDataString.Success_Greater_Than_Or_Equal_To;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.Success_Greater_Than_Or_Equal_To);

			expect(status).to.equal(200);
			expect(body.status).to.match(/success/i);
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gt", should respond with status "error"', async function () {
			const { data, rule } = RequestDataString.Failure_Greater_Than;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.Failure_Greater_Than);

			expect(status).to.equal(400);
			expect(body.status).to.match(/error/i);
			expect(body.data.validation.error).to.equal(true);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('should respond with status "field 8 is missing from data."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataString.MissingField);

			expect(status).to.equal(400);
			expect(body.status).to.match(/error/i);
			expect(body.message).to.equal('field 8 is missing from data.');
			expect(body.data).to.equal(null);
		});
	});

	describe('Request Evaluation: where request.data is a array', () => {
		it('given condition "eq", should respond with status "success"', async function () {
			const { data, rule } = RequestDataArray.Success_Contains;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.Success_Contains);

			expect(status).to.equal(200);
			expect(body.status).to.equal('success');
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "neq", should respond with status "success"', async function () {
			const { data, rule } = RequestDataArray.Success_Not_Equal_To;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.Success_Not_Equal_To);

			expect(status).to.equal(200);
			expect(body.status).to.equal('success');
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "contains", should respond with status "success"', async function () {
			const { data, rule } = RequestDataArray.Success_Contains;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.Success_Contains);

			expect(status).to.equal(200);
			expect(body.status).to.equal('success');
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gt", should respond with status "success"', async function () {
			const { data, rule } = RequestDataArray.Success_Greater_Than;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.Success_Greater_Than);

			expect(status).to.equal(200);
			expect(body.status).to.equal('success');
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "gte", should respond with status "success"', async function () {
			const { data, rule } = RequestDataArray.Success_Greater_Than_Or_Equal_To;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.Success_Greater_Than_Or_Equal_To);

			expect(status).to.equal(200);
			expect(body.status).to.equal('success');
			expect(body.data.validation.error).to.equal(false);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('given condition "contains", should respond with status "error"', async function () {
			const { data, rule } = RequestDataArray.Failure_Contains;
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.Failure_Contains);

			expect(status).to.equal(400);
			expect(body.status).to.match(/error/i);
			expect(body.data.validation.error).to.equal(true);
			assertDataValidated(body.data.validation, data, rule);
		});

		it('should respond with status "field 8 is missing from data."', async function () {
			const { status, body } = await request
				.post('/validate-rule')
				.send(RequestDataArray.MissingField);

			expect(status).to.equal(400);
			expect(body.status).to.match(/error/i);
			expect(body.message).to.equal('field 8 is missing from data.');
			expect(body.data).to.equal(null);
		});
	});
});
