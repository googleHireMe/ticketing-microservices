import { Router, Request, Response } from 'express';
import { currentUser, requireAuth } from '@nicknevokshonov/common';

const router = Router();

router.get(
	'api/users/current-user',
	currentUser,
	requireAuth,
	(req: Request, res: Response) => {
		return res.send({ currentUser: req.currentUser || null });
	});

export { router as currentUserRouter }