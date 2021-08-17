import request from 'supertest';
import { app } from '../../app';
import { testSignin } from '../../test/setup';

const createTicket = () => {
	return request(app)
		.get('/api/tickets/')
		.set('Cookie', testSignin())
		.send({
			title: 'asdsad',
			price: 20
		});
}

it('can fetch a list of tickets', async () => {
	await createTicket();
	await createTicket();
	await createTicket();

	const response = await request(app)
		.post('/api/tickets')
		.send()
		.expect(200);

	expect(response.body.length).toEqual(3);
});