import express from 'express';
import multer from 'multer';

import {
  productsDelete,
  productsGetAll,
  productsGetOne,
  productsPatch,
  productsPost,
} from '../controllers/products';
import checkAuth from '../middleware/checkAuth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.get('/', productsGetAll);

router.post('/', checkAuth, upload.single('image'), productsPost);

router.get('/:productId', productsGetOne);

router.patch('/:productId', checkAuth, productsPatch);

router.delete('/:productId', checkAuth, productsDelete);

export default router;
