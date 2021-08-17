import request from 'supertest';
import { app } from '../../app';
import { testSignin } from '../../test/setup';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`api/tickets/${id}`)
		.set('Cookie', testSignin())
		.send({
			title: 'adsad',
			price: 29
		})
		.expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`api/tickets/${id}`)
		.send({
			title: 'adsad',
			price: 29
		})
		.expect(401);
});

it('returns a 401 if the user doesnt own the ticket', async () => {
	const response = await request(app)
		.post('api/tickets')
		.set('Cookie', testSignin())
		.send({
			title: 'adsad',
			price: 29
		});

	await request(app)
		.put(`api/tickets/${response.body.id}`)
		.set('Cookie', testSignin())
		.send({
			title: 'sdadsadsad',
			price: 29222
		})
		.expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
	const cookie = testSignin();
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'sdasd',
			price: 20
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 20
		})
		.expect(400);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'sadsad',
			price: -10
		})
		.expect(400);
});

it('updates the ticket provided valid inputs', async () => {
	const cookie = testSignin();
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'sdasd',
			price: 20
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'TEST',
			price: 20
		})
		.expect(200);

	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send();

	expect(ticketResponse.body.title).toEqual('TEST');
	expect(ticketResponse.body.price).toEqual(100);
});