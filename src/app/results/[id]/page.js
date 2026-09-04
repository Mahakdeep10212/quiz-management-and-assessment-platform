"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, ArrowLeft, LayoutDashboard, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { formatTime } from "@/lib/utils";

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/attempts/${id}`);
        setResult(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResults();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error loading results</h2>
          <p className="text-gray-500 mb-6">{error || "Result not found"}</p>
          <Link href="/dashboard" className="block w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { quiz, answers } = result;
  const isPassed = result.percentage >= quiz.passingScore;

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <LayoutDashboard className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <Link href={`/quizzes/${quiz.id}`} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Take Quiz Again
          </Link>
        </div>

        {/* Score Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8 text-center">
          <div className={`p-8 ${isPassed ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            {isPassed ? (
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-100" />
            ) : (
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-100" />
            )}
            <h1 className="text-3xl font-extrabold mb-2">{isPassed ? 'Congratulations!' : 'Keep Practicing!'}</h1>
            <p className="text-lg opacity-90">You scored {result.percentage.toFixed(1)}%</p>
            <p className="text-sm opacity-75 mt-2">Passing score is {quiz.passingScore}%</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border-t border-gray-200">
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">Time Taken</p>
              <p className="text-xl font-bold text-gray-900">{formatTime(result.timeTaken)}</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">Correct</p>
              <p className="text-xl font-bold text-green-600">{result.correctAnswers}</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">Incorrect</p>
              <p className="text-xl font-bold text-red-600">{result.incorrectAnswers}</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">Unanswered</p>
              <p className="text-xl font-bold text-gray-600">{result.unanswered}</p>
            </div>
          </div>
        </div>

        {/* Detailed Review */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Answers</h2>
          
          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const studentAnswer = answers.find(a => a.questionId === question.id);
              const isCorrect = studentAnswer?.isCorrect;
              const isUnanswered = !studentAnswer?.selectedOptionId;

              return (
                <div key={question.id} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-bold text-gray-900">Question {index + 1}</span>
                    {isCorrect ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Correct (+{question.marks})
                      </span>
                    ) : isUnanswered ? (
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded-full flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Unanswered (0)
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect (0)
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg font-medium text-gray-900 mb-6 whitespace-pre-wrap">{question.questionText}</p>

                  <div className="space-y-3 mb-6">
                    {question.options.map((option, optIndex) => {
                      const isSelected = studentAnswer?.selectedOptionId === option.id;
                      const isActualCorrect = option.isCorrect;
                      
                      let optionClass = "border-gray-200 bg-gray-50";
                      let icon = null;

                      if (isActualCorrect && isSelected) {
                        optionClass = "border-green-500 bg-green-50 text-green-900 font-medium";
                        icon = <CheckCircle className="w-5 h-5 text-green-500" />;
                      } else if (isActualCorrect && !isSelected) {
                        optionClass = "border-green-500 bg-green-50 text-green-900 border-dashed";
                        icon = <CheckCircle className="w-5 h-5 text-green-500" />;
                      } else if (!isActualCorrect && isSelected) {
                        optionClass = "border-red-500 bg-red-50 text-red-900 font-medium";
                        icon = <XCircle className="w-5 h-5 text-red-500" />;
                      }

                      return (
                        <div key={option.id} className={`flex items-center justify-between p-4 rounded-lg border-2 ${optionClass}`}>
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold bg-white border border-gray-300">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span>{option.optionText}</span>
                          </div>
                          {icon}
                        </div>
                      );
                    })}
                  </div>

                  {question.explanation && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-indigo-900 text-sm">
                      <strong className="block mb-1">Explanation:</strong>
                      <p>{question.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
