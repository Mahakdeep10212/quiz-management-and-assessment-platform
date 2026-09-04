import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail, Calendar, CheckCircle, XCircle, Eye } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminUserDetailPage({ params }) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: resolvedParams.id },
    include: {
      attempts: {
        orderBy: { startedAt: "desc" },
        include: { quiz: { select: { title: true, passingScore: true } } }
      }
    }
  });

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">
        User not found.
      </div>
    );
  }

  const completedAttempts = user.attempts.filter(a => a.status === 'COMPLETED' || a.status === 'EXPIRED');
  const passed = completedAttempts.filter(a => a.percentage >= (a.quiz?.passingScore || 0)).length;
  const failed = completedAttempts.length - passed;
  const avgScore = completedAttempts.length > 0 
    ? (completedAttempts.reduce((sum, a) => sum + a.percentage, 0) / completedAttempts.length).toFixed(1) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {user.status}
            </span>
          </div>
          
          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <User className="w-5 h-5" />
              <span>Role: {user.role}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">Total Attempts</p>
              <p className="text-2xl font-bold text-gray-900">{user.attempts.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">Pass / Fail</p>
              <p className="text-2xl font-bold text-gray-900"><span className="text-green-600">{passed}</span> / <span className="text-red-600">{failed}</span></p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Quiz History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.attempts.map(attempt => (
                    <tr key={attempt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {attempt.quiz?.title || 'Unknown Quiz'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {attempt.percentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {attempt.status === 'IN_PROGRESS' ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">IN PROGRESS</span>
                        ) : attempt.percentage >= (attempt.quiz?.passingScore || 0) ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-green-600"><CheckCircle className="w-4 h-4"/> PASSED</span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-red-600"><XCircle className="w-4 h-4"/> FAILED</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(attempt.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {attempt.status !== 'IN_PROGRESS' && (
                          <Link href={`/results/${attempt.id}`} className="text-indigo-600 hover:text-indigo-900">
                            <Eye className="w-5 h-5 inline" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                  {user.attempts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No quiz attempts yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
