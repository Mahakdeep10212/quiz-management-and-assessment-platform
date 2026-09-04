import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const questions = await prisma.question.findMany({
      where: { quizId: resolvedParams.id },
      include: {
        options: true
      },
      orderBy: { createdAt: "asc" }
    });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { questionText, marks, explanation, difficulty, options } = await request.json();

    if (!questionText || !options || options.length < 2) {
      return NextResponse.json({ error: "Invalid question data. Minimum 2 options required." }, { status: 400 });
    }

    const correctOptions = options.filter(o => o.isCorrect);
    if (correctOptions.length !== 1) {
      return NextResponse.json({ error: "Exactly one correct option is required" }, { status: 400 });
    }

    const resolvedParams = await params;
    const question = await prisma.question.create({
      data: {
        quizId: resolvedParams.id,
        questionText,
        marks: parseInt(marks) || 1,
        explanation,
        difficulty: difficulty || 'MEDIUM',
        options: {
          create: options.map(opt => ({
            optionText: opt.optionText,
            isCorrect: opt.isCorrect
          }))
        }
      },
      include: {
        options: true
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}
