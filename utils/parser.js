function parseQuestions(text) {

  const blocks =
    text.split('\n\n');

  const result = [];

  blocks.forEach(block => {

    const lines =
      block.split('\n');

    const question =
      lines[0];

    const options =
      lines
        .slice(1)
        .map(line =>
          line
            .replace(
              /^[A-Z]\)/,
              ''
            )
            .trim()
        );

    result.push({
      question,
      options
    });

  });

  return result;
}

module.exports =
  parseQuestions;