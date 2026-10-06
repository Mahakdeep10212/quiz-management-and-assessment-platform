export function calculateScore(questions, answers) {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let totalMarks = 0;
  let obtainedMarks = 0;

  const answerRecords = [];

  for (const question of questions) {
    totalMarks += question.marks;
    const selectedOptionId = answers[question.id];
    const correctOption = question.options.find(o => o.isCorrect);

    let isCorrect = false;

    if (!selectedOptionId) {
      unansweredCount++;
    } else {
      if (correctOption && selectedOptionId === correctOption.id) {
        isCorrect = true;
        correctCount++;
        obtainedMarks += question.marks;
      } else {
        incorrectCount++;
      }
    }

    answerRecords.push({
      questionId: question.id,
      selectedOptionId: selectedOptionId || null,
      isCorrect: selectedOptionId ? isCorrect : null
    });
  }

  const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  return {
    correctCount,
    incorrectCount,
    unansweredCount,
    totalMarks,
    obtainedMarks,
    percentage,
    answerRecords
  };
}
