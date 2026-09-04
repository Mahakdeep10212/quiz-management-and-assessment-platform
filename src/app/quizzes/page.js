import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Clock, BarChart, CheckCircle } from "lucide-react";
import SearchBar from "./SearchBar";

export const dynamic = 'force-dynamic';

export default async function BrowseQuizzesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryId = resolvedSearchParams?.category;
  const search = resolvedSearchParams?.search;
  
  let whereClause = { status: "PUBLISHED" };
  if (categoryId) {
    whereClause.categoryId = categoryId;
  }
  if (search) {
    whereClause.title = {
      contains: search,
      mode: 'insensitive'
    };
  }

  const [quizzes, categories] = await Promise.all([
    prisma.quiz.findMany({
      where: whereClause,
      include: {
        category: true,
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" }
    })
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Quizzes</h1>
        <p className="text-gray-600">Find and take quizzes to test your knowledge.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href={`/quizzes${search ? `?search=${encodeURIComponent(search)}` : ''}`}
                  className={`block px-2 py-1.5 rounded ${!categoryId ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Categories
                </Link>
              </li>
              {categories.map(c => (
                <li key={c.id}>
                  <Link 
                    href={`/quizzes?category=${c.id}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                    className={`block px-2 py-1.5 rounded ${categoryId === c.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="flex-1">
          <SearchBar />
          
          {quizzes.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-gray-500">No published quizzes found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="bg-white flex flex-col rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {quiz.category.name}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        quiz.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{quiz.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{quiz.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.duration} mins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BarChart className="w-4 h-4" />
                        <span>{quiz._count.questions} Qs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Pass: {quiz.passingScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <Link 
                      href={`/quizzes/${quiz.id}`}
                      className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
