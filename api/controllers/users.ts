import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

import User from '../models/user';

export const userSignUp: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (user) {
    res.status(422).json({ message: 'The provided email already exists' });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash
        });
        try {
          const result = await user.save();
          const response = {
            message: 'User created',
            user: {
              _id: result._id,
              email: result.email,
              password: result.password
            }
          };
          res.status(201).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    });
  }
};

export const userLogin: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    res.status(401).json({ message: 'Auth failed' });
  } else {
    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if (err) {
        res.status(500).json(err);
      }
      if (same) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          'secret',
          { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Auth successful', token });
      } else {
        res.status(401).json({ message: 'Auth failed' });
      }
    });
  }
};
