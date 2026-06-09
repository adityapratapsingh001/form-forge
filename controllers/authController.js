const { google } =
require('googleapis');

// Login
const login =
(req, res) => {

  const oauth2Client =
    new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

  const url =
    oauth2Client
      .generateAuthUrl({

        access_type:
          'offline',

        prompt:
          'consent',

        scope: [
          'https://www.googleapis.com/auth/forms.body',
          'https://www.googleapis.com/auth/drive.file'
        ]
      });

  res.redirect(url);
};

// Callback
const callback =
async (req, res) => {

  try {

    const { code } =
      req.query;

    const oauth2Client =
      new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
      );

    const { tokens } =
      await oauth2Client
        .getToken(code);

    const encodedToken =
      encodeURIComponent(
        JSON.stringify(tokens)
      );

    console.log(
      'Login success'
    );

    res.redirect(
      `/dashboard?token=${encodedToken}`
    );

  } catch (error) {

    console.error(
      'OAuth Error:',
      error
    );

    res.status(500)
      .send(
        '❌ Login Failed'
      );
  }
};

// Logout
const logout =
(req, res) => {

  res.redirect('/');
};

module.exports = {
  login,
  callback,
  logout
};