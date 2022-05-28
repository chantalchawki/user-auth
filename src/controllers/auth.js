const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const redisClient = require('../config/redis');
const { logger } = require('../config/logger');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Please enter username and password' });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatchedPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isMatchedPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return res.status(200).json({ message: 'Welcome Back', data: token });
  } catch (err) {
    logger.error('Error in login', err);
    return res.status(500);
  }
});

router.post('/logout', (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const [namespace, token] = authorization.split(' ');
  if (namespace !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const expiresIn = decodedToken.exp - Math.floor(new Date().getTime() / 1000);
    redisClient.set(token, token, {
      EX: expiresIn,
    });
  } finally {
    res.status(200).json({ message: 'Logged out successfully' });
  }
});

router.post('/validate', async (req, res) => {
  const { token, role } = req.body;

  if (!token) {
    logger.debug('No token sent');
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const value = await redisClient.get(token);
    if (value) {
      logger.debug('Token is blacklisted');
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (decodedToken.role !== role) {
      logger.debug(`Role is not authorized: ${decodedToken.role} !== ${role}`);
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    return res.status(200).json({ message: 'User Authorized' });
  } catch (err) {
    logger.debug('Decoded token is invalid');
    return res.status(401).json({ message: 'Unauthorized request' });
  }
});

module.exports = router;
