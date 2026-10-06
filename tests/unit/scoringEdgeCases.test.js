import { describe, it, expect } from 'vitest';
import { calculateScore } from '../../src/lib/scoring';

describe('Scoring Logic Edge Cases', () => {
  it('should not crash when a question has no correct option marked', () => {
    const brokenQuestions = [
      {
        id: 'q_broken',
        marks: 5,
        options: [
          { id: 'o1', isCorrect: false },
          { id: 'o2', isCorrect: false }
        ]
      }
    ];

    const answers = { q_broken: 'o1' };
    const result = calculateScore(brokenQuestions, answers);

    expect(result.correctCount).toBe(0);
    expect(result.incorrectCount).toBe(1);
    expect(result.obtainedMarks).toBe(0);
    expect(result.percentage).toBe(0);
  });

  it('should handle completely empty answers gracefully', () => {
    const questions = [
      {
        id: 'q1',
        marks: 10,
        options: [{ id: 'o1', isCorrect: true }]
      }
    ];

    const result = calculateScore(questions, {});
    expect(result.correctCount).toBe(0);
    expect(result.unansweredCount).toBe(1);
    expect(result.obtainedMarks).toBe(0);
  });

  it('should handle questions with 0 total marks without NaN percentage', () => {
    const freeQuestions = [
      {
        id: 'q_free',
        marks: 0,
        options: [{ id: 'o1', isCorrect: true }]
      }
    ];

    const result = calculateScore(freeQuestions, { q_free: 'o1' });
    expect(result.percentage).toBe(0);
    expect(Number.isNaN(result.percentage)).toBe(false);
  });
});
