import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, BarChart, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export default async function QuizDetailsPage({ params }) {
  const resolvedParams = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: resolvedParams.id },
    include: {
      category: true,
      _count: {
        select: { questions: true }
      }
    }
  });

  if (!quiz || quiz.status !== "PUBLISHED") {
    notFound();
  }

  // Get current user attempts to check if they have exceeded max attempts
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  
  let attemptsCount = 0;
  let canAttempt = false;

  if (session && session.role === "STUDENT") {
    attemptsCount = await prisma.attempt.count({
      where: {
        quizId: quiz.id,
        userId: session.userId,
        status: { in: ['COMPLETED', 'EXPIRED'] }
      }
    });
    canAttempt = attemptsCount < quiz.maxAttempts;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/quizzes" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Quizzes
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-12 text-white text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 backdrop-blur-sm">
            {quiz.category.name}
          </span>
          <h1 className="text-4xl font-extrabold mb-4">{quiz.title}</h1>
          <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
            {quiz.description}
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <Clock className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="font-bold text-gray-900">{quiz.duration} mins</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <BarChart className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Questions</p>
              <p className="font-bold text-gray-900">{quiz._count.questions}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <CheckCircle className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Passing Score</p>
              <p className="font-bold text-gray-900">{quiz.passingScore}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <AlertCircle className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Max Attempts</p>
              <p className="font-bold text-gray-900">{quiz.maxAttempts}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 text-blue-900">
            <h3 className="font-bold mb-2">Instructions:</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>The quiz contains {quiz._count.questions} questions and must be completed in {quiz.duration} minutes.</li>
              <li>You need at least {quiz.passingScore}% to pass this quiz.</li>
              <li>Do not refresh the page while taking the quiz.</li>
              <li>The quiz will automatically submit when the timer expires.</li>
              <li>You have used {attemptsCount} of {quiz.maxAttempts} allowed attempts.</li>
            </ul>
          </div>

          <div className="text-center">
            {!session ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg inline-block">
                <p className="text-yellow-800 mb-3">You must be logged in to take this quiz.</p>
                <Link href="/login" className="inline-block px-6 py-2 bg-yellow-600 text-white rounded-md font-medium hover:bg-yellow-700">
                  Log in to Start
                </Link>
              </div>
            ) : session.role !== "STUDENT" ? (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg inline-block">
                <p className="text-gray-600">Only students can attempt quizzes.</p>
              </div>
            ) : !canAttempt ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg inline-block">
                <p className="text-red-800 font-medium">You have reached the maximum number of attempts for this quiz.</p>
              </div>
            ) : (
              <form action={`/api/quizzes/${quiz.id}/start`} method="POST">
                <button type="submit" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:-translate-y-1">
                  Start Quiz Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
