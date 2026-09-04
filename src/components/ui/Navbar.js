import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import Link from 'next/link';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { Sparkles, Trophy, BookOpen } from 'lucide-react';

export default async function Navbar() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo size="default" />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/quizzes"
              className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-indigo-50/70"
            >
              <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              <span>Quizzes</span>
            </Link>

            <Link
              href="/leaderboard"
              className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-indigo-50/70"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Leaderboard</span>
            </Link>

            {session ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <Link
                  href={session.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  {session.role === "ADMIN" ? "Admin Portal" : "My Dashboard"}
                </Link>
                <UserMenu user={session} />
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/login"
                  className="text-slate-700 hover:text-indigo-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="relative group overflow-hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-500/30 hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  <span className="relative z-10">Get Started</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

