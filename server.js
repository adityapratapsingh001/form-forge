require('dotenv').config();

const express = require('express');

const authRoutes =
require('./routes/authRoutes');

const formRoutes =
require('./routes/formRoutes');

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/', formRoutes);

app.listen(3000, () => {
  console.log(
    '🚀 Server running on port 3000'
  );
});