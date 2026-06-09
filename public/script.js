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

    // Validation
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
                  questions, // FIXED

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

        result.innerHTML =
          data.error ||
          'Error creating form';
      }

    } catch (error) {

      console.error(error);

      result.innerHTML =
        'Something went wrong';
    }

  });