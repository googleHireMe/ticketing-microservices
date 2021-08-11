import { Request, Response, NextFunction } from 'express';
import { NotAuthrizedError } from '../errors/not-authrized-error';

export const requireAuth = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser){
		throw new NotAuthrizedError();
	}
	next();
}