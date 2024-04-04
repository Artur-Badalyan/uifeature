import { Router } from 'express';
const router = Router();

import users from './users.js';
import tasks from './tasks.js';
import auth from './auth.js';

const controllers = [
    auth,users,tasks
];

controllers.forEach(controller => {
    controller(router);
});

export default router;