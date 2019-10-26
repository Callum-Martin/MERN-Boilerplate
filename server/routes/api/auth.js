const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// Login User
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: 'Please enter all fields',
    });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ message: 'Cannot find a user matching those credentials' });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ message: 'Cannot find a user matching those credentials' });

      jwt.sign(
        { id: user.id },
        require('../../config/keys').jwtSecret,
        { expiresIn: require('../../config/keys').jwtExpires },
        (err, token) => {
          if (err) throw err;
          const returnUser = user;
          delete returnUser.password;
          res.json({
            user: returnUser,
            token,
          });
        }
      );
    });
  });
});

// Get Token
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
