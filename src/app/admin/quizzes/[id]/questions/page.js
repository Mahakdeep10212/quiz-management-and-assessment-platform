"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, Loader2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function QuestionsPage() {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  
  const [formData, setFormData] = useState({
    questionText: "",
    marks: 1,
    explanation: "",
    difficulty: "MEDIUM",
    options: [
      { optionText: "", isCorrect: true },
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false }
    ]
  });
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [quizRes, questionsRes] = await Promise.all([
        axios.get(`/api/quizzes/${quizId}`),
        axios.get(`/api/quizzes/${quizId}/questions`)
      ]);
      setQuiz(quizRes.data);
      setQuestions(questionsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (quizId) fetchData();
  }, [quizId]);

  const handleOpenModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        questionText: question.questionText,
        marks: question.marks,
        explanation: question.explanation || "",
        difficulty: question.difficulty,
        options: question.options.map(o => ({ id: o.id, optionText: o.optionText, isCorrect: o.isCorrect }))
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        questionText: "",
        marks: 1,
        explanation: "",
        difficulty: "MEDIUM",
        options: [
          { optionText: "", isCorrect: true },
          { optionText: "", isCorrect: false },
          { optionText: "", isCorrect: false },
          { optionText: "", isCorrect: false }
        ]
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    if (field === "isCorrect") {
      newOptions.forEach((o, i) => {
        o.isCorrect = i === index;
      });
    } else {
      newOptions[index][field] = value;
    }
    setFormData({ ...formData, options: newOptions });
  };

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { optionText: "", isCorrect: false }]
    });
  };

  const handleRemoveOption = (index) => {
    if (formData.options.length <= 2) {
      setError("A question must have at least 2 options.");
      return;
    }
    const newOptions = formData.options.filter((_, i) => i !== index);
    if (formData.options[index].isCorrect) {
      newOptions[0].isCorrect = true;
    }
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Validate options
    const emptyOptions = formData.options.filter(o => !o.optionText.trim());
    if (emptyOptions.length > 0) {
      setError("All options must have text.");
      setSaving(false);
      return;
    }

    try {
      if (editingQuestion) {
        await axios.put(`/api/questions/${editingQuestion.id}`, formData);
      } else {
        await axios.post(`/api/quizzes/${quizId}/questions`, formData);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`/api/questions/${id}`);
        fetchData();
      } catch (err) {
        alert(err.response?.data?.error || "An error occurred while deleting");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/quizzes" className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Questions</h1>
            {quiz && <p className="text-sm text-gray-500">Quiz: {quiz.title}</p>}
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">Q{index + 1}.</span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-800">{question.marks} Mark(s)</span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-800">{question.difficulty}</span>
                  </div>
                  <p className="text-gray-800 font-medium whitespace-pre-wrap">{question.questionText}</p>
                  
                  <div className="mt-4 space-y-2">
                    {question.options.map((opt, i) => (
                      <div key={opt.id} className={`p-2 rounded border ${opt.isCorrect ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex justify-center items-center text-xs font-bold ${opt.isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className={opt.isCorrect ? 'font-medium text-green-900' : 'text-gray-700'}>{opt.optionText}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {question.explanation && (
                    <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded text-sm text-indigo-900">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(question)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(question.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {questions.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
              No questions found. Click &apos;Add Question&apos; to create one.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingQuestion ? "Edit Question" : "Add Question"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question Text</label>
                <textarea
                  required
                  value={formData.questionText}
                  onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marks</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  <button type="button" onClick={handleAddOption} className="text-xs text-indigo-600 hover:text-indigo-900 font-medium">
                    + Add Option
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={opt.isCorrect}
                        onChange={() => handleOptionChange(idx, "isCorrect", true)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        title="Mark as correct"
                      />
                      <input
                        type="text"
                        required
                        value={opt.optionText}
                        onChange={(e) => handleOptionChange(idx, "optionText", e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${opt.isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(idx)}
                        className="p-2 text-gray-400 hover:text-red-500"
                        disabled={formData.options.length <= 2}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">Select the radio button next to the correct option.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Explanation (Optional)</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Explain why the correct answer is correct..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
