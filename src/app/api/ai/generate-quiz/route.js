import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { generateQuizWithAI } from "@/lib/ai";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 403 });
    }

    const body = await request.json();
    const { topic, difficulty = "MEDIUM", questionCount = 5, categoryId, status = "PUBLISHED" } = body;

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json({ error: "Topic is required for AI quiz generation." }, { status: 400 });
    }

    // Determine category
    let finalCategoryId = categoryId;
    if (!finalCategoryId) {
      // Find or create 'AI Assessments' category
      let category = await prisma.category.findFirst({
        where: { name: "AI Assessments" }
      });
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: "AI Assessments",
            description: "Quizzes automatically engineered by Generative AI"
          }
        });
      }
      finalCategoryId = category.id;
    }

    // Call AI service
    const generated = await generateQuizWithAI({
      topic: topic.trim(),
      difficulty: difficulty.toUpperCase(),
      questionCount: parseInt(questionCount, 10) || 5
    });

    // Save into database with transaction
    const newQuiz = await prisma.quiz.create({
      data: {
        title: generated.title || `${topic} Assessment`,
        description: generated.description || `AI-generated assessment for ${topic}.`,
        categoryId: finalCategoryId,
        difficulty: generated.difficulty || difficulty,
        duration: generated.duration || 15,
        passingScore: generated.passingScore || 60,
        maxAttempts: 3,
        status: status,
        questions: {
          create: (generated.questions || []).map((q) => ({
            questionText: q.questionText,
            difficulty: q.difficulty || difficulty,
            marks: 1,
            explanation: q.explanation || "Correct option is derived from fundamental core principles.",
            options: {
              create: (q.options || []).map((opt) => ({
                optionText: opt.optionText,
                isCorrect: Boolean(opt.isCorrect)
              }))
            }
          }))
        }
      },
      include: {
        category: true,
        questions: {
          include: {
            options: true
          }
        },
        _count: {
          select: { questions: true, attempts: true }
        }
      }
    });

    return NextResponse.json(
      {
        message: "Quiz generated successfully by AI",
        quiz: newQuiz
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API/AI/GENERATE-QUIZ] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate quiz with AI" },
      { status: 500 }
    );
  }
}
