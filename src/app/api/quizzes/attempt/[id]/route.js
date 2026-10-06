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

    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const attempt = await prisma.attempt.findUnique({
      where: { id: resolvedParams.id },
      include: {
        quiz: {
          include: {
            questions: {
              select: {
                id: true,
                questionText: true,
                marks: true,
                difficulty: true,
                quizId: true,
                options: {
                  select: {
                    id: true,
                    optionText: true,
                    questionId: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!attempt || attempt.userId !== session.userId) {
      return NextResponse.json({ error: "Attempt not found or unauthorized" }, { status: 404 });
    }

    if (attempt.status !== "IN_PROGRESS") {
      return NextResponse.json({ error: "This attempt has already been submitted or expired" }, { status: 400 });
    }

    // Check if time is expired on backend
    const startedAt = new Date(attempt.startedAt).getTime();
    const durationMs = attempt.quiz.duration * 60 * 1000;
    const expiresAt = startedAt + durationMs;
    const now = Date.now();

    // Give a 10 seconds grace period for network latency
    if (now > expiresAt + 10000) {
      // Time is up, mark as expired and calculate score
      // Note: Full scoring logic should be here, but to avoid duplication we can let the frontend submit or auto-submit
      // Actually, if they try to fetch after expiry, we should force them to submit.
      return NextResponse.json({ error: "Time has expired", isExpired: true, expiresAt }, { status: 400 });
    }

    return NextResponse.json({
      attemptId: attempt.id,
      startedAt: attempt.startedAt,
      expiresAt: new Date(expiresAt).toISOString(),
      quiz: attempt.quiz
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to load quiz attempt" }, { status: 500 });
  }
}
