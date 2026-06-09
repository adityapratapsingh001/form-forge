function parseQuestions(text) {

  const blocks =
    text
      .trim()
      .split(/\n\s*\n/);

  const questions =
    [];

  for (const block of blocks) {

    const lines =
      block
        .split('\n')
        .map(line =>
          line.trim()
        )
        .filter(Boolean);

    if (
      lines.length < 2
    ) continue;

    // First line = question
    const question =
      lines[0]
        .replace(
          /^\d+\.\s*/,
          ''
        );

    // Remaining lines = options
    const options =
      lines
        .slice(1)
        .map(line =>
          line.replace(
            /^[A-D]\)\s*/,
            ''
          )
        )
        .filter(Boolean);

    questions.push({
      question,
      options
    });
  }

  return questions;
}

module.exports =
  parseQuestions;