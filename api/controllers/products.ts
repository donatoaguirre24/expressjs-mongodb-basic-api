import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import Product from '../models/product';

const create: RequestHandler = async ({ body }, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: body.name,
    price: body.price,
  });

  try {
    const { _id, name, price } = await product.save();

    const response = {
      message: 'Product created',
      product: { _id, name, price },
      request: {
        type: 'GET',
        url: `http://localhost:8080/products/${_id}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAll: RequestHandler = async (req, res) => {
  try {
    const result = await Product.find().exec();

    const response = {
      count: result.length,
      products: result.map(({ _id, name, price }) => ({
        _id,
        name,
        price,
        request: {
          type: 'GET',
          url: `http://localhost:8080/products/${_id}`,
        },
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOne: RequestHandler = async ({ params }, res) => {
  const { productId } = params;

  try {
    const result = await Product.findById(productId)
      .select('_id name price image')
      .exec();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const update: RequestHandler = async ({ body, params }, res) => {
  const { productId } = params;

  try {
    await Product.update({ _id: productId }, { $set: { ...body } }).exec();

    res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: `http://localhost:8080/products/${productId}`,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy: RequestHandler = async ({ params }, res) => {
  try {
    await Product.remove({ _id: params.productId }).exec();

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  create,
  getAll,
  getOne,
  update,
  destroy,
};
