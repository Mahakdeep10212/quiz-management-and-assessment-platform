import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Target,
  Trophy,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Flame,
  Zap,
} from "lucide-react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
        {/* Background glow meshes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-300/30 via-violet-300/20 to-cyan-300/30 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 shadow-xs text-indigo-700 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span>Next-Gen Skill Assessment Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Master skills faster with{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                  SkillPulse
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Supercharge your technical proficiency with timed, server-validated assessments, instant deep-dive analytics, and competitive global leaderboards.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {session ? (
                  <Link
                    href={session.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all"
                  >
                    <span>Launch Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all"
                    >
                      <span>Start Free Assessment</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/quizzes"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-slate-700 font-semibold bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
                    >
                      Browse All Quizzes
                    </Link>
                  </>
                )}
              </div>

              {/* Key Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Real-time Anti-Cheat Timers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Granular Breakdown & Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Live Peer Leaderboard</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-indigo-500/10 border border-slate-200/80">
                {/* Mock Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-slate-400 ml-2">React & Next.js Core</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200/70 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>04:42</span>
                  </div>
                </div>

                {/* Simulated Question */}
                <div className="py-5 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Question 4 of 10</span>
                    <p className="text-sm font-bold text-slate-800 leading-snug">
                      Which Next.js App Router feature enables parallel data fetching without blocking the main render tree?
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-700 hover:border-indigo-200 cursor-pointer">
                      <span>A. Sequential getInitialProps</span>
                      <span className="w-4 h-4 rounded-full border border-slate-300" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border-2 border-indigo-600 bg-indigo-50/60 text-xs font-semibold text-indigo-900 shadow-xs">
                      <span>B. React Suspense with Server Components</span>
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">✓</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-700 hover:border-indigo-200 cursor-pointer">
                      <span>C. Client-side useEffect polling</span>
                      <span className="w-4 h-4 rounded-full border border-slate-300" />
                    </div>
                  </div>
                </div>

                {/* Mock Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Server Verified</span>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors">
                    Next Question →
                  </button>
                </div>
              </div>

              {/* Floating Performance Tag */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Instant Score</p>
                  <p className="text-sm font-bold text-slate-900">96% • Top 5%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="bg-slate-900 py-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                50,000+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Assessments Taken</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                100+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Expert Modules</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                99.9%
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Timer Accuracy</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                Real-Time
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Live Leaderboards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Engineered for Mastery
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Everything you need to test, track, and triumph
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Built with state-of-the-art architecture to deliver a seamless test-taking experience for candidates and effortless administration for organizers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="group relative rounded-2xl p-7 bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center mb-5 shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Curated Question Banks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Categorized quizzes spanning Web Development, Algorithms, Databases, and DevOps with rich explanations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl p-7 bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mb-5 shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Precision Timers</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strict, backend-validated countdowns enforce fair assessment durations and automatic secure submissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl p-7 bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">In-Depth Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspect question-by-question breakdowns, percentage score distributions, and performance evolution over time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative rounded-2xl p-7 bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center mb-5 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Global Leaderboards</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Climb the ranks, benchmark your skill against peers across the globe, and unlock achievement badges.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to test your knowledge with SkillPulse?
          </h2>
          <p className="text-indigo-200 text-base sm:text-lg max-w-2xl mx-auto">
            Create your free account in seconds and unlock immediate access to our full library of interactive quizzes.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-slate-900 font-bold bg-gradient-to-r from-cyan-300 via-white to-cyan-200 hover:brightness-105 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all text-base"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
