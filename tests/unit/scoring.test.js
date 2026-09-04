import { describe, it, expect } from 'vitest';
import { calculateScore } from '../../src/lib/scoring';

describe('Scoring Logic', () => {
  const mockQuestions = [
    {
      id: 'q1',
      marks: 10,
      options: [{ id: 'o1', isCorrect: true }, { id: 'o2', isCorrect: false }]
    },
    {
      id: 'q2',
      marks: 20,
      options: [{ id: 'o3', isCorrect: false }, { id: 'o4', isCorrect: true }]
    },
    {
      id: 'q3',
      marks: 5,
      options: [{ id: 'o5', isCorrect: true }, { id: 'o6', isCorrect: false }]
    }
  ]; // Total marks = 35

  it('should calculate 100% score for all correct answers', () => {
    const answers = {
      'q1': 'o1',
      'q2': 'o4',
      'q3': 'o5'
    };

    const result = calculateScore(mockQuestions, answers);

    expect(result.correctCount).toBe(3);
    expect(result.incorrectCount).toBe(0);
    expect(result.unansweredCount).toBe(0);
    expect(result.totalMarks).toBe(35);
    expect(result.obtainedMarks).toBe(35);
    expect(result.percentage).toBe(100);
  });

  it('should calculate 0% score for all incorrect answers', () => {
    const answers = {
      'q1': 'o2',
      'q2': 'o3',
      'q3': 'o6'
    };

    const result = calculateScore(mockQuestions, answers);

    expect(result.correctCount).toBe(0);
    expect(result.incorrectCount).toBe(3);
    expect(result.unansweredCount).toBe(0);
    expect(result.obtainedMarks).toBe(0);
    expect(result.percentage).toBe(0);
  });

  it('should calculate correctly for partial correct answers and unanswered', () => {
    const answers = {
      'q1': 'o1', // Correct (10 marks)
      'q2': 'o3', // Incorrect (0 marks)
      // q3 is unanswered
    };

    const result = calculateScore(mockQuestions, answers);

    expect(result.correctCount).toBe(1);
    expect(result.incorrectCount).toBe(1);
    expect(result.unansweredCount).toBe(1);
    expect(result.obtainedMarks).toBe(10);
    expect(result.totalMarks).toBe(35);
    
    // (10 / 35) * 100 = 28.5714...
    expect(result.percentage).toBeCloseTo((10/35)*100, 2);
    
    // Check answer records format
    expect(result.answerRecords.length).toBe(3);
    expect(result.answerRecords[2].questionId).toBe('q3');
    expect(result.answerRecords[2].selectedOptionId).toBeNull();
    expect(result.answerRecords[2].isCorrect).toBeNull();
  });

  it('should handle zero questions gracefully', () => {
    const result = calculateScore([], {});
    expect(result.totalMarks).toBe(0);
    expect(result.obtainedMarks).toBe(0);
    expect(result.percentage).toBe(0);
  });
});
