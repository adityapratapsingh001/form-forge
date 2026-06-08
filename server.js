require('dotenv').config();

const express =
require('express');

const path =
require('path');

const authRoutes =
require('./routes/authRoutes');

const formRoutes =
require('./routes/formRoutes');

const app = express();

// Middleware
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// Static files
app.use(
  express.static(
    path.join(
      __dirname,
      'public'
    )
  )
);

// Homepage
app.get('/', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'index.html'
    )
  );

});

// Dashboard
app.get('/dashboard', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'dashboard.html'
    )
  );

});

// Routes
app.use('/auth', authRoutes);
app.use('/', formRoutes);

// Localhost only
if (
  process.env.NODE_ENV
  !== 'production'
) {

  app.listen(
    3000,
    () => {

      console.log(
        '🚀 Server running on port 3000'
      );

    }
  );
}

// Export for Vercel
module.exports = app;