const { google } =
require('googleapis');

const oauth2Client =
new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Login
const login =
(req, res) => {

  const url =
    oauth2Client.generateAuthUrl({
      access_type: 'offline',

      scope: [
        'https://www.googleapis.com/auth/forms.body'
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

    const { tokens } =
      await oauth2Client
        .getToken(code);

    oauth2Client
      .setCredentials(tokens);

    req.app.locals.auth =
      oauth2Client;

res.redirect('/dashboard.html');

  } catch (error) {

    console.log(error);

    res.send(
      '❌ Login Failed'
    );
  }
};
const logout =
(req, res) => {

  req.app.locals.auth =
    null;

  res.redirect('/');
};

module.exports = {
  login,
  callback,
  logout
};;