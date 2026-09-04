import Link from "next/link";
import Logo from "./Logo";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center">
              <Logo size="default" className="text-white" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering learners and teams worldwide with adaptive skill evaluations, real-time analytics, and instant feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/quizzes" className="hover:text-indigo-400 transition-colors">
                  Explore Quizzes
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-indigo-400 transition-colors">
                  Global Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Popular Tracks</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Full-Stack Development</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Data Science & Python</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Cloud & DevOps</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">System Architecture</li>
            </ul>
          </div>

          {/* Social & Community */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Connect</h4>
            <p className="text-sm text-slate-400 mb-3">
              Join thousands of developers leveling up their domain expertise daily.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/Mahakdeep10212/quiz-management-and-assessment-platform"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <div className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillPulse Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for passionate learners
          </p>
        </div>
      </div>
    </footer>
  );
}
