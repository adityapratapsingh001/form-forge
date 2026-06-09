const { google } =
require('googleapis');

const parseQuestions =
require('../utils/parser');

// -----------------------------
// Question type mapping
// -----------------------------
function getQuestionType(type) {

  const map = {
    MCQ: 'RADIO',
    Checkbox: 'CHECKBOX',
    Dropdown: 'DROP_DOWN'
  };

  return map[type] || 'RADIO';
}
const createForm =
async (req, res) => {

  try {

    const {
      token,
      text,
      type
    } = req.body;

    if (!token) {

      return res
        .status(401)
        .json({
          success: false,
          error:
            'Please login first'
        });

    }
    const oauth2Client =
      new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
    oauth2Client
      .setCredentials(
        JSON.parse(token)
      );

    const auth =
      oauth2Client;
    if (!text) {
      return res
        .status(400)
        .json({
          success: false,
          error:
            'Questions are required'
        });

    }
    const parsedQuestions =
      parseQuestions(text);
    const forms =
      google.forms({
        version: 'v1',
        auth
      });
      console.log(
  'TOKEN:',
  JSON.parse(token)
);
    const form =
      await forms.forms.create({
        requestBody: {
          info: {
            title:
              'Auto Generated Form'
          }
        }
      });

    const formId =
      form.data.formId;

    const googleType =
      getQuestionType(type);
    const requests =
      parsedQuestions.map(
        (q, index) => ({
          createItem: {

            item: {
              title:
                q.question,

              questionItem: {
                question: {

                  required: true,

                  choiceQuestion: {
                    type:
                      googleType,

                    options:
                      q.options.map(
                        opt => ({
                          value: opt
                        })
                      )
                  }
                }
              }
            },

            location: {
              index
            }
          }
        })
      );
    await forms.forms.batchUpdate({
      formId,

      requestBody: {
        requests
      }
    });
    res.json({
      success: true,
      formLink:
        form.data
          .responderUri
    });

  } catch (error) {

    console.error(
      'Create form error:',
      error
    );

    res.status(500)
.json({
  success: false,
  error:
    error.response?.data
    || error.message
});
  }
};

module.exports = {
  createForm
};