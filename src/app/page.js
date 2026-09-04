import Link from "next/link";
import { ArrowRight, BookOpen, Target, Trophy, Clock } from "lucide-react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-20">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Master your skills with</span>{' '}
                  <span className="block text-indigo-600 xl:inline">Labmentix</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  A production-quality assessment platform designed to evaluate and improve your knowledge across multiple disciplines. Dive into our comprehensive quizzes and track your progress today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    {session ? (
                      <Link
                        href={session.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    ) : (
                      <Link
                        href="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </Link>
                    )}
                  </div>
                  {!session && (
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        href="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-indigo-50 flex items-center justify-center p-12">
          {/* Decorative graphic instead of image to ensure it looks good without external assets */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <div className="h-3 w-1/3 bg-white/30 rounded-full"></div>
              <div className="h-3 w-16 bg-white/30 rounded-full"></div>
            </div>
            <div className="p-6 space-y-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
              <div className="pt-4 space-y-3">
                <div className="h-12 w-full bg-indigo-50 border border-indigo-100 rounded-lg flex items-center px-4 gap-3">
                  <div className="h-4 w-4 rounded-full bg-indigo-400"></div>
                  <div className="h-3 w-1/2 bg-indigo-200 rounded-full"></div>
                </div>
                <div className="h-12 w-full bg-gray-50 border border-gray-100 rounded-lg flex items-center px-4 gap-3">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                  <div className="h-3 w-2/3 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-12 w-full bg-gray-50 border border-gray-100 rounded-lg flex items-center px-4 gap-3">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <div className="h-10 w-24 bg-indigo-600 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Diverse Categories</h3>
                <p className="text-base text-gray-500">
                  Explore quizzes across various domains including React, Node.js, Python, and more.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Timed Assessments</h3>
                <p className="text-base text-gray-500">
                  Simulate real-world testing environments with strict, backend-validated timers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analytics</h3>
                <p className="text-base text-gray-500">
                  Review your answers, see explanations, and track your performance over time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Global Leaderboard</h3>
                <p className="text-base text-gray-500">
                  Compete with peers globally and see your rank climb as you master new skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
