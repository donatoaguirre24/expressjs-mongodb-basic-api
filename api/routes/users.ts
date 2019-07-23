import express from 'express';

import { userSignUp, userLogin } from '../controllers/users';

const router = express.Router();

router.post('/signup', userSignUp);

router.post('/login', userLogin);

export default router;
