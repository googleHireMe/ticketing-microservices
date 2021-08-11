import request from 'supertest';
import { app } from '../../app';
import { testSignup } from '../../test/setup';

it('respond with details about current user', async () => {
		const cookie = await testSignup();
		const response  = await request(app)
		.post('api/users/current-user')
		.set('Cookie', cookie)
		.send()
		.expect(200);

		expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('respond with if not authenticated', async () => {
	const response  = await request(app)
	.post('api/users/current-user')
	.send()
	.expect(200);

	expect(response.body.currentUser.email).toEqual(null);
});