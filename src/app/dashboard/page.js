import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import Link from "next/link";
import { BookOpen, Award, TrendingUp, Clock } from "lucide-react";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (!session || session.role !== "STUDENT") {
    redirect("/login");
  }

  const attempts = await prisma.attempt.findMany({
    where: { userId: session.userId, status: { in: ['COMPLETED', 'EXPIRED'] } },
    include: { quiz: true },
    orderBy: { completedAt: "desc" }
  });

  const totalAttempted = attempts.length;
  const passed = attempts.filter(a => a.percentage >= a.quiz.passingScore).length;
  const failed = totalAttempted - passed;
  const avgScore = totalAttempted > 0 
    ? (attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempted).toFixed(1) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {session.name}</h1>
          <p className="text-gray-600">Here&apos;s an overview of your learning progress.</p>
        </div>
        <Link 
          href="/quizzes" 
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Browse Quizzes
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Quizzes</p>
            <p className="text-2xl font-bold text-gray-900">{totalAttempted}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Passed</p>
            <p className="text-2xl font-bold text-gray-900">{passed}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Failed</p>
            <p className="text-2xl font-bold text-gray-900">{failed}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Avg Score</p>
            <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        {attempts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500 mb-4">You haven&apos;t taken any quizzes yet.</p>
            <Link href="/quizzes" className="text-indigo-600 font-medium hover:underline">
              Start your first quiz
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {attempts.slice(0, 5).map(attempt => (
                <li key={attempt.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{attempt.quiz.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{attempt.percentage}%</p>
                      <p className={`text-xs font-medium ${attempt.percentage >= attempt.quiz.passingScore ? 'text-green-600' : 'text-red-600'}`}>
                        {attempt.percentage >= attempt.quiz.passingScore ? 'PASSED' : 'FAILED'}
                      </p>
                    </div>
                    <Link href={`/results/${attempt.id}`} className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
