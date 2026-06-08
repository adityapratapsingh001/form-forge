const { google } =
require('googleapis');

const parseQuestions =
require('../utils/parser');

// Question type mapping
function getQuestionType(type) {

  const map = {
    MCQ: 'RADIO',
    Checkbox:
      'CHECKBOX',

    Dropdown:
      'DROP_DOWN'
  };

  return map[type]
    || 'RADIO';
}

const createForm =
async (req, res) => {

  try {

    const auth =
      req.app.locals.auth;

    if (!auth) {
      return res.send(
        '❌ Please login first'
      );
    }

    const {
      text,
      type
    } = req.body;

    const parsedQuestions =
      parseQuestions(text);

    const forms =
      google.forms({
        version: 'v1',
        auth
      });

    // Create form
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

    // Build requests
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

    // Add questions
    await forms
      .forms
      .batchUpdate({

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

    console.log(error);

    res.status(500)
      .json({
        success: false,
        error:
          error.message
      });
  }
};

module.exports = {
  createForm
};