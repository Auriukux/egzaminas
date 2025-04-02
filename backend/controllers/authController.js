const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Įveskite visus laukus' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Vartotojas su šiuo el. paštu jau egzistuoja' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Serverio klaida', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Neteisingi duomenys' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Serverio klaida', error: error.message });
  }
};

module.exports = { register, login };