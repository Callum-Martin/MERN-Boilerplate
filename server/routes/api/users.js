const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

const User = require('../../models/User');

// Register
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Please enter all fields',
    });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ message: 'Email already taken' });

    const colors = [
      '#54428e',
      '#8963ba',
      '#afe3c0',
      '#90c290',
      '#688b58',
      '#f45b69',
      '#5a0001',
      '#22181c',
      '#f13030',
      '#401f3e',
      '#3f2e56',
      '#453f78',
      '#2c363f',
    ];

    const newUser = new User({
      name,
      email,
      password,
      profileColor: colors[Math.floor(Math.random() * colors.length)],
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
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
  });
});

// Delete User
router.delete('/', auth, (req, res) => {
  User.findById(req.user.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.put('/', auth, async (req, res) => {
  try {
    var user = await User.findById(req.user.id);

    const updateableFields = ['name', 'email'];

    for (var key in req.body) {
      if (updateableFields.indexOf(key) !== -1) {
        user[key] = req.body[key];
      }
    }

    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Upload Profile Image
router.post('/profile-image', auth, async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ message: 'No file was uploaded' });
    }

    const file = req.files.file;

    const user = await User.findById(req.user.id);

    if (user.profilePicture !== '') {
      // TODO user has profile picture, delete it
    }

    file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, err => {
      if (err) return res.status(500).json({ message: 'Error uploading file' });
    });

    user.profilePicture = file.name;

    await user.save();

    return res.json({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    });
  } catch (err) {}
});

module.exports = router;
