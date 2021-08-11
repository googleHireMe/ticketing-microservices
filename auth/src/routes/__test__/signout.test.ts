import request from 'supertest';
import { app } from '../../app';

// it('cleans the cookie after signing out', async () => {
// 	await request(app)
// 		.post('api/users/signun')
// 		.send({
// 			email: 'test@test.com',
// 			passwor: 'password'
// 		})
// 		.expect(201);

// 		const response  = await request(app)
// 		.post('api/users/signout')
// 		.send({})
// 		.expect(200);

// 		//expect(request.agent('Set-Cookie')).not().toBeDefined();
// });