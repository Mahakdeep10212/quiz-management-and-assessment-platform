import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const status = searchParams.get('status');

    let whereClause = {};
    if (categoryId) whereClause.categoryId = categoryId;
    if (status) whereClause.status = status;

    const quizzes = await prisma.quiz.findMany({
      where: whereClause,
      include: {
        category: true,
        _count: {
          select: { questions: true, attempts: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();

    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        difficulty: data.difficulty || 'MEDIUM',
        duration: parseInt(data.duration) || 30,
        passingScore: parseInt(data.passingScore) || 50,
        maxAttempts: parseInt(data.maxAttempts) || 1,
        status: data.status || 'DRAFT'
      }
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
  }
}
