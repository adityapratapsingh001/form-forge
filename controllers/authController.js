const { google } =
require('googleapis');
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
          'https://www.googleapis.com/auth/forms.body'
        ]
      });

  res.redirect(url);
};
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

    // Encode token
    const encodedToken =
      encodeURIComponent(
        JSON.stringify(tokens)
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
const logout =
(req, res) => {

  res.redirect('/');
};

module.exports = {
  login,
  callback,
  logout
};