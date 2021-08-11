import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

export const app = express()
	.set('trust proxy', true)
	.use(json())
	.use(cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	}))
	.use(currentUserRouter)
	.use(signinRouter)
	.use(signoutRouter)
	.use(signupRouter)
	.use(errorHandler)
	.all('*', async (req, res) => {
		throw new NotFoundError();
	});