import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, List, FolderOpen, Trophy, ChevronRight, Shield } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AdminLayout({ children }) {
  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Categories", href: "/admin/categories", icon: FolderOpen },
    { label: "Quizzes", href: "/admin/quizzes", icon: BookOpen },
    { label: "Results & Attempts", href: "/admin/results", icon: List },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200/80 hidden md:flex flex-col shadow-xs">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Portal</p>
              <p className="text-sm font-bold text-slate-800">Admin Control</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400">
          <p className="font-semibold text-slate-600">SkillPulse v1.0.0</p>
          <p>Admin Environment</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
        {children}
      </main>
    </div>
  );
}

