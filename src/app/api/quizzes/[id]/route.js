import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;
    const isAdmin = session?.role === "ADMIN";

    const quiz = await prisma.quiz.findUnique({
      where: { id: resolvedParams.id },
      include: {
        category: true,
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    if (!isAdmin) {
      if (quiz.status !== "PUBLISHED") {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
      }
      // Strip correct answers and explanations for non-admins
      const sanitizedQuestions = quiz.questions.map((q) => ({
        id: q.id,
        quizId: q.quizId,
        questionText: q.questionText,
        marks: q.marks,
        difficulty: q.difficulty,
        options: q.options.map((opt) => ({
          id: opt.id,
          questionId: opt.questionId,
          optionText: opt.optionText
        }))
      }));
      return NextResponse.json({ ...quiz, questions: sanitizedQuestions });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();

    const resolvedParams = await params;
    const quiz = await prisma.quiz.update({
      where: { id: resolvedParams.id },
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        difficulty: data.difficulty,
        duration: parseInt(data.duration),
        passingScore: parseInt(data.passingScore),
        maxAttempts: parseInt(data.maxAttempts),
        status: data.status
      }
    });

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const resolvedParams = await params;
    await prisma.quiz.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ message: "Quiz deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
  }
}
