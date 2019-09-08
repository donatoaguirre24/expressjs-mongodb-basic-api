import mongoose from 'mongoose';
import { RequestHandler } from 'express';

import Order from '../models/order';
import Product from '../models/product';

export const ordersGetAll: RequestHandler = async (req, res) => {
  try {
    const result = await Order.find().exec();
    const response = {
      count: result.length,
      orders: result.map((order) => ({
        _id: order._id,
        product: order.product,
        quantity: order.quantity,
        request: {
          type: 'GET',
          url: `http://localhost:8080/orders/${order._id}`
        }
      }))
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ordersPost: RequestHandler = async (req, res) => {
  try {
    const validProduct = await Product.findById(req.body.productId);
    if (!validProduct) {
      res.status(404).json({ message: 'The product does not exist' });
    } else {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
      });
      const result = await order.save();
      const response = {
        message: 'Order created',
        order: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: `http://localhost:8080/orders/${result._id}`
        }
      };
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ordersGetOne: RequestHandler = async (req, res) => {
  try {
    const result = await Order.findById(req.params.orderId)
      .select('_id product quantity')
      .populate('product', '_id name price')
      .exec();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ordersDelete: RequestHandler = async (req, res) => {
  try {
    Order.remove({ _id: req.params.productId }).exec();
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};
