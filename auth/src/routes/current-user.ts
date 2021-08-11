import { Router, Request, Response } from 'express';

const router = Router();

router.get('api/users/current-user', (req: Request, res: Response) => {
	res.send('Ok');
});

export { router as currentUserRouter }