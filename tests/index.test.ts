import supertest from 'supertest';
import { expect } from 'chai';
import 'mocha';

import app from '../src/app';

const request = supertest(app);

describe('Rules Validation', () => {
	it('should return my details', async function () {
		const { status } = await request.get('/');

		console.log(status);

		expect(status).to.equal(200);
	});
});
