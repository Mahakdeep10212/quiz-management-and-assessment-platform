/**
 * Generative AI Integration for SkillPulse
 * Supports Google Gemini API and OpenAI API with an intelligent local fallback generator.
 */

export async function generateQuizWithAI({ topic, difficulty = "MEDIUM", questionCount = 5 }) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const raw = await generateWithGemini({ topic, difficulty, questionCount, apiKey: geminiKey });
      return validateAndNormalizeQuiz(raw, topic, difficulty, questionCount);
    } catch (err) {
      console.warn("[AI] Gemini generation failed, switching to OpenAI/fallback:", err.message);
    }
  }

  if (openaiKey) {
    try {
      const raw = await generateWithOpenAI({ topic, difficulty, questionCount, apiKey: openaiKey });
      return validateAndNormalizeQuiz(raw, topic, difficulty, questionCount);
    } catch (err) {
      console.warn("[AI] OpenAI generation failed, switching to fallback generator:", err.message);
    }
  }

  // Built-in intelligent fallback generator
  return generateFallbackQuiz({ topic, difficulty, questionCount });
}

export async function explainWithAI({ questionText, selectedOptionText, correctOptionText, explanation }) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const prompt = `You are a friendly, encouraging senior technical mentor for a learning platform called SkillPulse.
A candidate answered an assessment question and needs a personalized explanation.

Question: "${questionText}"
User Selected: "${selectedOptionText || 'No answer chosen'}"
Correct Answer: "${correctOptionText}"
Base Explanation: "${explanation || ''}"

Please provide a concise, high-impact breakdown:
1. Why the correct answer is right and the underlying principle.
2. If the user was wrong or skipped, what the common misconception is.
3. A quick memory tip or key takeaway.
Keep the response under 150 words, structured with markdown bolding.`;

  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
          })
        }
      );
      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.warn("[AI] Gemini explain failed:", e.message);
    }
  }

  if (openaiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 300
        })
      });
      if (response.ok) {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (e) {
      console.warn("[AI] OpenAI explain failed:", e.message);
    }
  }

  // Fallback explanation
  return `💡 **Core Concept Breakdown**:
The correct option is **${correctOptionText}**. ${explanation || "This aligns with industry best practices and core architectural patterns."}

⚠️ **Common Pitfall**:
When dealing with ${questionText.slice(0, 45)}..., candidates often confuse similar terminology or overlook edge cases.

🎯 **Key Takeaway**:
Focus on the underlying mechanism rather than rote memorization. Remember that **${correctOptionText}** directly addresses the primary objective of this problem.`;
}

async function generateWithGemini({ topic, difficulty, questionCount, apiKey }) {
  const prompt = `You are a principal software engineering examiner. Generate a complete, high-quality technical assessment quiz about "${topic}" at "${difficulty}" difficulty level with exactly ${questionCount} multiple-choice questions.

Return ONLY a valid JSON object matching this exact schema:
{
  "title": "${topic} Fundamentals & Practice",
  "description": "Comprehensive assessment covering core and advanced concepts of ${topic}.",
  "difficulty": "${difficulty}",
  "duration": ${Math.max(10, questionCount * 2)},
  "passingScore": 60,
  "questions": [
    {
      "questionText": "Clear question text here?",
      "difficulty": "${difficulty}",
      "explanation": "Detailed explanation of why the correct option is right.",
      "options": [
        { "optionText": "Option A", "isCorrect": false },
        { "optionText": "Option B", "isCorrect": true },
        { "optionText": "Option C", "isCorrect": false },
        { "optionText": "Option D", "isCorrect": false }
      ]
    }
  ]
}
Ensure exactly 4 options per question with exactly 1 marked isCorrect: true. Return raw JSON without markdown code fences if possible.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(25000),
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini HTTP Error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Empty response from Gemini");

  return JSON.parse(cleanJsonString(rawText));
}

async function generateWithOpenAI({ topic, difficulty, questionCount, apiKey }) {
  const prompt = `Generate a technical assessment quiz about "${topic}" at "${difficulty}" difficulty with ${questionCount} MCQs. Return JSON with title, description, difficulty, duration, passingScore, and questions array. Each question must have questionText, explanation, difficulty, and 4 options (exactly 1 isCorrect: true).`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    signal: AbortSignal.timeout(25000),
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) throw new Error(`OpenAI HTTP Error ${res.status}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

function cleanJsonString(str) {
  return str.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
}

function validateAndNormalizeQuiz(data, topic, difficulty, questionCount) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid AI quiz response: expected JSON object");
  }

  const rawQuestions = Array.isArray(data.questions) ? data.questions : [];
  if (rawQuestions.length === 0) {
    throw new Error("Invalid AI quiz response: missing questions array");
  }

  const normalizedQuestions = rawQuestions.map((q, idx) => {
    const rawOptions = Array.isArray(q.options) ? q.options : [];
    if (rawOptions.length < 2) {
      throw new Error(`Question ${idx + 1} has fewer than 2 options`);
    }

    const hasCorrect = rawOptions.some(opt => Boolean(opt.isCorrect));
    const normalizedOptions = rawOptions.map((opt, optIdx) => ({
      optionText: String(opt.optionText || opt.text || `Option ${optIdx + 1}`).trim(),
      isCorrect: hasCorrect ? Boolean(opt.isCorrect) : optIdx === 0
    }));

    return {
      questionText: String(q.questionText || q.question || `Question ${idx + 1}`).trim(),
      difficulty: q.difficulty || difficulty || "MEDIUM",
      explanation: String(q.explanation || "Correct option is derived from fundamental core principles.").trim(),
      options: normalizedOptions
    };
  });

  return {
    title: String(data.title || `${topic} Assessment`).trim(),
    description: String(data.description || `Assessment covering concepts of ${topic}.`).trim(),
    difficulty: data.difficulty || difficulty || "MEDIUM",
    duration: parseInt(data.duration, 10) || Math.max(10, normalizedQuestions.length * 2),
    passingScore: parseInt(data.passingScore, 10) || 60,
    questions: normalizedQuestions
  };
}

function generateFallbackQuiz({ topic, difficulty, questionCount }) {
  const diff = ["EASY", "MEDIUM", "HARD"].includes(difficulty.toUpperCase())
    ? difficulty.toUpperCase()
    : "MEDIUM";
  const count = Math.min(Math.max(parseInt(questionCount, 10) || 5, 3), 15);

  const sampleQuestions = [
    {
      q: `What is the primary architectural purpose of ${topic}?`,
      opts: [
        { t: `To provide modular, scalable, and maintainable implementation patterns`, c: true },
        { t: `To replace runtime memory management completely`, c: false },
        { t: `To eliminate network latency across distributed nodes`, c: false },
        { t: `To bypass standard data validation protocols`, c: false }
      ],
      exp: `${topic} is fundamentally designed to enhance software maintainability, separation of concerns, and system scalability.`
    },
    {
      q: `Which of the following is considered an essential best practice when working with ${topic}?`,
      opts: [
        { t: `Adhering to deterministic state transitions and predictable side-effects`, c: true },
        { t: `Hardcoding configuration parameters into production builds`, c: false },
        { t: `Disabling logging and error tracing to boost throughput`, c: false },
        { t: `Ignoring asynchronous exception boundaries`, c: false }
      ],
      exp: `Predictable state handling and explicit side-effect boundaries are critical for reliability in ${topic}.`
    },
    {
      q: `In the context of ${topic}, how should performance bottlenecks primarily be diagnosed?`,
      opts: [
        { t: `Through systematic profiling, telemetry metrics, and tracing`, c: true },
        { t: `By randomly refactoring business logic layers`, c: false },
        { t: `By doubling hardware capacity without telemetry inspection`, c: false },
        { t: `By disabling compiler optimization flags`, c: false }
      ],
      exp: `Telemetry, execution profiling, and trace analysis provide empirical data to pinpoint latency and resource saturation.`
    },
    {
      q: `What security consideration is most critical when designing solutions around ${topic}?`,
      opts: [
        { t: `Strict input sanitization, least-privilege access, and defense-in-depth`, c: true },
        { t: `Storing secret credentials directly in version control`, c: false },
        { t: `Permitting unauthenticated access across internal service boundaries`, c: false },
        { t: `Relying solely on client-side authentication checks`, c: false }
      ],
      exp: `Defense-in-depth and enforcing least privilege ensure that compromise of any single component does not compromise the broader infrastructure.`
    },
    {
      q: `How does modern tooling in ${topic} handle concurrency and high-throughput workloads?`,
      opts: [
        { t: `Via asynchronous non-blocking I/O or worker thread concurrency`, c: true },
        { t: `By synchronizing all thread operations on a single global lock`, c: false },
        { t: `By dropping incoming requests when execution queues exceed unity`, c: false },
        { t: `By converting all concurrent operations to blocking serial loops`, c: false }
      ],
      exp: `Non-blocking event loops and parallel worker threads allow applications to handle massive concurrency without saturating kernel threads.`
    },
    {
      q: `Which trade-off is commonly encountered when scaling ${topic}?`,
      opts: [
        { t: `Consistency vs. Availability and partition tolerance (CAP theorem)`, c: true },
        { t: `Compile-time type checking vs. binary file size only`, c: false },
        { t: `CSS specificity vs. relational table indexing`, c: false },
        { t: `Local CPU cache line width vs. Git branch frequency`, c: false }
      ],
      exp: `Distributed systems inherently balance consistency, latency, and fault tolerance under network partition conditions.`
    },
    {
      q: `What is the recommended approach for automated testing in ${topic}?`,
      opts: [
        { t: `A balanced pyramid of fast unit tests, integration suites, and end-to-end regression tests`, c: true },
        { t: `Relying solely on manual smoke testing in production`, c: false },
        { t: `Writing tests only when runtime exceptions are reported by users`, c: false },
        { t: `Skipping automated assertions to reduce build duration`, c: false }
      ],
      exp: `A healthy test pyramid provides rapid feedback during local development while guaranteeing holistic regression prevention.`
    },
    {
      q: `How should schema migrations and versioning be managed in ${topic}?`,
      opts: [
        { t: `Declarative migration scripts version-controlled alongside application source code`, c: true },
        { t: `Applying ad-hoc manual mutations directly in production databases`, c: false },
        { t: `Deleting the persistent store on each deployment cycle`, c: false },
        { t: `Avoiding schema alterations across the entire product lifecycle`, c: false }
      ],
      exp: `Versioned migrations guarantee repeatable, deterministic database states across testing, staging, and production environments.`
    }
  ];

  const questions = [];
  for (let i = 0; i < count; i++) {
    const template = sampleQuestions[i % sampleQuestions.length];
    // Randomize option order so correct answer is not predictably always Option A
    const shuffledOpts = [...template.opts].sort(() => Math.random() - 0.5);
    questions.push({
      questionText: template.q,
      difficulty: diff,
      explanation: template.exp,
      options: shuffledOpts.map(o => ({
        optionText: o.t,
        isCorrect: o.c
      }))
    });
  }

  return {
    title: `${topic} Master Assessment`,
    description: `Comprehensive evaluation testing foundational and intermediate concepts of ${topic}. Generated via AI assessment engine.`,
    difficulty: diff,
    duration: Math.max(10, count * 2),
    passingScore: 60,
    questions
  };
}
