import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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

export const testSignin = () => {
	const payload  = {
		id: new mongoose.Types.ObjectId().toHexString();,
		email: 'test@test.com'
	};
	const token = jwt.sign(payload, process.env.JWT_KEY!);
	const session = { jwt: token };
	const sessionJSON = JSON.stringify(session);
	const base64 = Buffer.from(sessionJSON).toString('base64');
	return `express:sess=${base64}`;
}