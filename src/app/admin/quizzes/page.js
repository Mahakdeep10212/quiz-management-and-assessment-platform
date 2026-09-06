"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, Loader2, X, Eye, List, Sparkles } from "lucide-react";
import Link from "next/link";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiSuccess, setAiSuccess] = useState("");
  const [aiFormData, setAiFormData] = useState({
    topic: "",
    difficulty: "MEDIUM",
    questionCount: 5,
    categoryId: ""
  });
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    difficulty: "MEDIUM",
    duration: 30,
    passingScore: 50,
    maxAttempts: 1,
    status: "DRAFT"
  });
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [quizzesRes, categoriesRes] = await Promise.all([
        axios.get("/api/quizzes"),
        axios.get("/api/categories")
      ]);
      setQuizzes(quizzesRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleOpenModal = (quiz = null) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setFormData({
        title: quiz.title,
        description: quiz.description || "",
        categoryId: quiz.categoryId,
        difficulty: quiz.difficulty,
        duration: quiz.duration,
        passingScore: quiz.passingScore,
        maxAttempts: quiz.maxAttempts,
        status: quiz.status
      });
    } else {
      setEditingQuiz(null);
      setFormData({
        title: "",
        description: "",
        categoryId: categories.length > 0 ? categories[0].id : "",
        difficulty: "MEDIUM",
        duration: 30,
        passingScore: 50,
        maxAttempts: 1,
        status: "DRAFT"
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingQuiz) {
        await axios.put(`/api/quizzes/${editingQuiz.id}`, formData);
      } else {
        await axios.post("/api/quizzes", formData);
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
    if (confirm("Are you sure you want to delete this quiz? All associated questions and attempts will be deleted!")) {
      try {
        await axios.delete(`/api/quizzes/${id}`);
        fetchData();
      } catch (err) {
        alert(err.response?.data?.error || "An error occurred while deleting");
      }
    }
  };

  const togglePublishStatus = async (quiz) => {
    const newStatus = quiz.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED";
    try {
      await axios.patch(`/api/quizzes/${quiz.id}/publish`, { status: newStatus });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred updating status");
    }
  };

  const handleGenerateAiQuiz = async (e) => {
    e.preventDefault();
    if (!aiFormData.topic.trim()) {
      setAiError("Please enter a topic for the AI quiz");
      return;
    }
    setAiGenerating(true);
    setAiError("");
    setAiSuccess("");
    try {
      const res = await axios.post("/api/ai/generate-quiz", aiFormData);
      setAiSuccess(`Successfully generated "${res.data.quiz.title}" with ${res.data.quiz.questions?.length || aiFormData.questionCount} questions!`);
      setTimeout(() => {
        setIsAiModalOpen(false);
        setAiSuccess("");
        setAiFormData({ topic: "", difficulty: "MEDIUM", questionCount: 5, categoryId: "" });
        fetchData();
      }, 1500);
    } catch (err) {
      setAiError(err.response?.data?.error || "AI generation failed. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'PUBLISHED': return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>;
      case 'DRAFT': return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Draft</span>;
      case 'UNPUBLISHED': return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Unpublished</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
          <p className="text-xs text-gray-500 mt-1">Manage assessment tracks or generate instant question banks with AI</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAiError("");
              setAiSuccess("");
              setIsAiModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-md hover:opacity-95 shadow-sm font-medium transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Generate with AI
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Manual Quiz
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                    <div className="text-sm text-gray-500">{quiz.category?.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{quiz.duration} min | {quiz.difficulty}</div>
                    <div className="text-sm text-gray-500">{quiz._count?.questions} questions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(quiz.status)}
                    <button 
                      onClick={() => togglePublishStatus(quiz)}
                      className="ml-2 text-xs text-indigo-600 hover:text-indigo-900"
                    >
                      (Toggle)
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/quizzes/${quiz.id}/questions`} className="text-blue-600 hover:text-blue-900 mr-4" title="Manage Questions">
                      <List className="w-4 h-4 inline" />
                    </Link>
                    <button onClick={() => handleOpenModal(quiz)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(quiz.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {quizzes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No quizzes found. Click &apos;Create Quiz&apos; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingQuiz ? "Edit Quiz" : "Create Quiz"}
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
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Passing Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Attempts</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.maxAttempts}
                    onChange={(e) => setFormData({ ...formData, maxAttempts: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="UNPUBLISHED">Unpublished</option>
                  </select>
                </div>
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
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      {/* AI Quiz Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-indigo-100 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Quiz Generator</h2>
                  <p className="text-xs text-gray-500">Auto-generate comprehensive questions with Gemini AI</p>
                </div>
              </div>
              <button
                onClick={() => !aiGenerating && setIsAiModalOpen(false)}
                disabled={aiGenerating}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {aiError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {aiError}
              </div>
            )}

            {aiSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium">
                {aiSuccess}
              </div>
            )}

            <form onSubmit={handleGenerateAiQuiz} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Topic or Subject Prompt <span className="text-indigo-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Docker & Containers, React 19 Hooks, System Design..."
                  disabled={aiGenerating}
                  value={aiFormData.topic}
                  onChange={(e) => setAiFormData({ ...aiFormData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl shadow-xs text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">AI will synthesize questions, multiple-choice options, and pedagogical rationales.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Difficulty Level</label>
                  <select
                    disabled={aiGenerating}
                    value={aiFormData.difficulty}
                    onChange={(e) => setAiFormData({ ...aiFormData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  >
                    <option value="EASY">Easy (Foundational)</option>
                    <option value="MEDIUM">Medium (Intermediate)</option>
                    <option value="HARD">Hard (Advanced)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Question Count</label>
                  <select
                    disabled={aiGenerating}
                    value={aiFormData.questionCount}
                    onChange={(e) => setAiFormData({ ...aiFormData, questionCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  >
                    <option value={3}>3 Questions (Quick)</option>
                    <option value={5}>5 Questions (Standard)</option>
                    <option value={10}>10 Questions (Deep Dive)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  disabled={aiGenerating}
                  value={aiFormData.categoryId}
                  onChange={(e) => setAiFormData({ ...aiFormData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                >
                  <option value="">Auto-assign (AI Assessments)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  disabled={aiGenerating}
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={aiGenerating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 shadow-md shadow-indigo-500/20 disabled:opacity-60 transition-all"
                >
                  {aiGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Generate Quiz Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
