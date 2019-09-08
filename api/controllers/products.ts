import mongoose from 'mongoose';
import { RequestHandler } from 'express';

import Product from '../models/product';

export const productsGetAll: RequestHandler = async (_req, res) => {
  try {
    const result = await Product.find().exec();
    const response = {
      count: result.length,
      products: result.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        request: {
          type: 'GET',
          url: `http://localhost:8080/products/${product._id}`
        }
      }))
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
    image: `http://localhost:8080/${req.file.path}`
  });
  try {
    const result = await product.save();
    const response = {
      message: 'Product created',
      product: {
        _id: result._id,
        name: result.name,
        price: result.price,
        image: result.image
      },
      request: {
        type: 'GET',
        url: `http://localhost:8080/products/${result._id}`
      }
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
  const update: any = {};
  Object.keys(req.body).map((field) => {
    update[field] = req.body[field];
  });
  try {
    await Product.update({ _id: id }, { $set: update }).exec();
    res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: `http://localhost:8080/products/${id}`
      }
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
