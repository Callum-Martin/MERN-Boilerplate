const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(fileUpload());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Mongo DB Connected!'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
