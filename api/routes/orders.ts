import express from 'express';

import {
  ordersDelete,
  ordersGetAll,
  ordersGetOne,
  ordersPost
} from '../controllers/orders';
import checkAuth from '../middleware/checkAuth';

const router = express.Router();

router.get('/', checkAuth, ordersGetAll);

router.post('/', checkAuth, ordersPost);

router.get('/:orderId', checkAuth, ordersGetOne);

router.delete('/:productId', checkAuth, ordersDelete);

export default router;
