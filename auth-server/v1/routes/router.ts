import Router from 'express';
import { login, register } from '../controllers/authentication';

const router = Router();
router
    .route('/auth/register')
    .post(register);

router
    .route('/auth/login')
    .post(login);

export default router;
