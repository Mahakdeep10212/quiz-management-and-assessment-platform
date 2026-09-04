import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, List, FolderOpen, Trophy } from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <LayoutDashboard className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <Users className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Users</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <FolderOpen className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Categories</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/quizzes" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <BookOpen className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Quizzes</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/results" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <List className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Results / Attempts</span>
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <Trophy className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Leaderboard</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
