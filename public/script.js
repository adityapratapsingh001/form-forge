const urlParams =
new URLSearchParams(
  window.location.search
);

const token =
urlParams.get('token');

const btn =
document.getElementById(
  'generateBtn'
);

btn.addEventListener(
  'click',
  async () => {

    const questions =
      document
        .getElementById(
          'questions'
        )
        .value;

    const type =
      document
        .getElementById(
          'questionType'
        )
        .value;

    const result =
      document
        .getElementById(
          'result'
        );

    // Login check
    if (!token) {

      result.innerHTML =
        'Please login again';

      return;
    }

    // Questions validation
    if (!questions.trim()) {

      result.innerHTML =
        'Please enter questions';

      return;
    }

    result.innerHTML =
      'Creating form...';

    try {

      const response =
        await fetch(
          '/create-form',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify({

                text:
                  questions,

                type,

                token
              })
          }
        );

      const data =
        await response.json();

      if (data.success) {

        result.innerHTML = `
          <a
            href="${data.formLink}"
            target="_blank"
          >
            Open Created Form 🚀
          </a>
        `;

      } else {

        // Better error handling
        const errorMessage =
          typeof data.error
          === 'object'

            ? JSON.stringify(
                data.error,
                null,
                2
              )

            : data.error;

        result.innerHTML =
          errorMessage
          || 'Error creating form';
      }

    } catch (error) {

      console.error(
        error
      );

      result.innerHTML =
        'Something went wrong';
    }
  });