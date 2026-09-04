"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Loader2, Clock, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function QuizAttemptPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitQuiz = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`/api/quizzes/attempt/${id}/submit`, { answers });
      router.push(`/results/${res.data.attemptId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit quiz");
      setSubmitting(false);
    }
  }, [id, answers, submitting, router]);

  const fetchAttemptData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/quizzes/attempt/${id}`);
      setData(res.data);
      
      const expiresAt = new Date(res.data.expiresAt).getTime();
      const now = Date.now();
      const remainingSeconds = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimeLeft(remainingSeconds);
    } catch (err) {
      if (err.response?.data?.isExpired) {
        submitQuiz();
      } else {
        setError(err.response?.data?.error || "Failed to load quiz");
      }
    } finally {
      setLoading(false);
    }
  }, [id, submitQuiz]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAttemptData();
  }, [fetchAttemptData]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitQuiz]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-500 mb-6">{error || "Could not load quiz"}</p>
          <button 
            onClick={() => router.push('/quizzes')}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Return to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const { quiz } = data;
  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <h1 className="text-xl font-bold text-gray-900 truncate">{data.quiz.title}</h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-indigo-600'}`} />
                <span className={`font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-indigo-900'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <button
                onClick={() => {
                  if(confirm("Are you sure you want to submit your quiz? You cannot change answers after submission.")) {
                    submitQuiz();
                  }
                }}
                disabled={submitting}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center gap-2 transition-colors"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Question Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                {currentQuestion.marks} Marks
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-8 leading-relaxed whitespace-pre-wrap">
              {currentQuestion.questionText}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                    className={`w-full flex items-center p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                      isSelected ? 'border-indigo-600' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-indigo-600" />}
                    </div>
                    <span className="text-gray-800 text-lg">{option.optionText}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-100">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={isFirstQuestion}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={isLastQuestion}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigator */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Question Navigator</h3>
            
            <div className="flex justify-between text-sm mb-6 pb-6 border-b border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{answeredCount}</div>
                <div className="text-gray-500">Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">{questions.length - answeredCount}</div>
                <div className="text-gray-500">Pending</div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 w-10 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                      isCurrent 
                        ? 'ring-2 ring-indigo-600 ring-offset-2 ' + (isAnswered ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-indigo-600 text-indigo-600')
                        : isAnswered 
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200 hover:bg-indigo-200' 
                          : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
