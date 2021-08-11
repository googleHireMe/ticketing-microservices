import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: MongoMemoryServer;

beforeAll(async () => {
	process.env.JWT_KEY = '12321';

	mongo = new MongoMemoryServer();
	const mongoUrl = await mongo.getUri();

	await mongoose.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

export const testSignup = async () => {
	const email = 'test@test.com';
	const passwor = 'password';
	const authResponse = await request(app)
		.post('api/users/signun')
		.send({
			email, passwor
		})
		.expect(201);

	const cookie = authResponse.get('Set-Cookie');
	return cookie;
}