const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if the user already exists in the database
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists' });
    }

    // If the user doesn't exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { loginMail, loginPassword } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email: loginMail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate a JWT token with user data
    const token = jwt.sign({ user }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Logged in successfully', token, user });
    // console.log('user')
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { signUp, login };
