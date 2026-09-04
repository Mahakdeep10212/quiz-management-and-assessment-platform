import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const resolvedParams = await params;
    const { questionText, marks, explanation, difficulty, options } = await request.json();

    if (!questionText || !options || options.length < 2) {
      return NextResponse.json({ error: "Invalid question data. Minimum 2 options required." }, { status: 400 });
    }

    const correctOptions = options.filter(o => o.isCorrect);
    if (correctOptions.length !== 1) {
      return NextResponse.json({ error: "Exactly one correct option is required" }, { status: 400 });
    }

    // We delete existing options and create new ones for simplicity instead of diffing
    const question = await prisma.question.update({
      where: { id: resolvedParams.id },
      data: {
        questionText,
        marks: parseInt(marks) || 1,
        explanation,
        difficulty,
        options: {
          deleteMany: {},
          create: options.map(opt => ({
            optionText: opt.optionText,
            isCorrect: opt.isCorrect
          }))
        }
      },
      include: { options: true }
    });

    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
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
    await prisma.question.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ message: "Question deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
  }
}
