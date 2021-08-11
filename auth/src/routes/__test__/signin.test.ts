import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
	return request(app)
		.post('api/users/signin')
		.send({
			email: 'test@test.com',
			passwor: 'password'
		})
		.expect(400);
});

it('fails when an incorrect password is supplied', async () => {
	await request(app)
		.post('api/users/signun')
		.send({
			email: 'test@test.com',
			passwor: 'password'
		})
		.expect(201);

	await request(app)
		.post('api/users/signin')
		.send({
			email: 'test@test.com',
			passwor: 'asdsadsad'
		})
		.expect(400);
});

it('response with cookie when give valid credentials', async () => {
	await request(app)
		.post('api/users/signun')
		.send({
			email: 'test@test.com',
			passwor: 'password'
		})
		.expect(201);

	await request(app)
		.post('api/users/signin')
		.send({
			email: 'test@test.com',
			passwor: 'password'
		})
		.expect(200);

	expect(request.agent('Set-Cookie')).toBeDefined();
});