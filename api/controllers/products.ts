import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import Product from '../models/product';

export const productsGetAll: RequestHandler = async (_req, res) => {
  try {
    const result = await Product.find().exec();
    const response = {
      count: result.length,
      products: result.map(({ _id, name, price, image }) => ({
        _id,
        name,
        price,
        image,
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

export const productsPost: RequestHandler = async (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    image: `http://localhost:8080/${req.file.path}`,
  });

  try {
    const { _id, name, price, image } = await product.save();
    const response = {
      message: 'Product created',
      product: { _id, name, price, image },
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

export const productsGetOne: RequestHandler = async (req, res) => {
  const id = req.params.productId;

  try {
    const result = await Product.findById(id)
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

export const productsPatch: RequestHandler = async (req, res) => {
  const id = req.params.productId;
  const updateFields: any = { ...req.body };

  try {
    await Product.update({ _id: id }, { $set: updateFields }).exec();
    res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: `http://localhost:8080/products/${id}`,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const productsDelete: RequestHandler = async (req, res) => {
  try {
    await Product.remove({ _id: req.params.productId }).exec();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};
