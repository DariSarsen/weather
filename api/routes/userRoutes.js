const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).json({ message: 'Необходимо заполнить все поля' });
    } 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.blockedUntil && user.blockedUntil > new Date()) {
      return res.status(401).json({ message: `Account is blocked until ${user.blockedUntil}` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const loginAttempts = user.loginAttempts + 1;
      const maxLoginAttempts = 5;
      const lockoutTimeInMinutes = 5; 
      if (loginAttempts >= maxLoginAttempts) {
        const blockedUntil = new Date();
        blockedUntil.setSeconds(blockedUntil.getSeconds() + lockoutTimeInMinutes);
        await User.findByIdAndUpdate(user._id, { loginAttempts: 0, blockedUntil });
        return res.status(401).json({ message: `Too many login attempts. Account is blocked until ${blockedUntil}` });
      } else {
        await User.findByIdAndUpdate(user._id, { loginAttempts });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    await User.findByIdAndUpdate(user._id, { loginAttempts: 0, blockedUntil: null });

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const token = jwt.sign({ userId: user._id, exp: Math.floor(expirationTime.getTime() / 1000) }, 'stack_mean');
    
    res.status(200).json({ message: 'Login successful', token, expirationTime, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
