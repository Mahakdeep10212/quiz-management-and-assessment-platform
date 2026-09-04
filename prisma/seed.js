const { PrismaClient } = require('../src/generated/prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
const bcrypt = require('bcrypt')

const webQuizzes = require('./quizDataWeb');
const coreQuizzes = require('./quizDataCore');

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database safely...')

  // Create Users safely (upsert)
  const passwordHash = await bcrypt.hash('password123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  })

  await prisma.user.upsert({
    where: { email: 'student1@example.com' },
    update: {},
    create: {
      name: 'Student One',
      email: 'student1@example.com',
      passwordHash,
      role: 'STUDENT',
      status: 'ACTIVE'
    }
  })

  await prisma.user.upsert({
    where: { email: 'student2@example.com' },
    update: {},
    create: {
      name: 'Student Two',
      email: 'student2@example.com',
      passwordHash,
      role: 'STUDENT',
      status: 'ACTIVE'
    }
  })

  // Ensure all categories exist
  const categoriesList = [
    'JavaScript', 'React', 'HTML', 'CSS', 'Node.js', 
    'Python', 'Java', 'Database', 'Computer Networks', 'Cyber Security'
  ]

  const categoryMap = {}
  for (const catName of categoriesList) {
    const category = await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: {
        name: catName,
        description: `Questions related to ${catName}`
      }
    })
    categoryMap[catName] = category.id
  }

  // --- Seed Original Quizzes if they don't exist ---
  const existingJsQuiz = await prisma.quiz.findFirst({ where: { title: 'JavaScript Fundamentals' } })
  if (!existingJsQuiz) {
    const jsQuiz = await prisma.quiz.create({
      data: {
        title: 'JavaScript Fundamentals',
        description: 'Test your basic JavaScript knowledge.',
        categoryId: categoryMap['JavaScript'],
        difficulty: 'MEDIUM',
        duration: 20,
        passingScore: 60,
        maxAttempts: 2,
        status: 'PUBLISHED',
        questions: {
          create: [
            {
              questionText: 'Which method converts a JSON string into a JavaScript object?',
              marks: 1,
              explanation: 'JSON.parse() is used to parse a JSON string and construct the JavaScript value or object described by the string.',
              difficulty: 'EASY',
              options: {
                create: [
                  { optionText: 'JSON.stringify()', isCorrect: false },
                  { optionText: 'JSON.parse()', isCorrect: true },
                  { optionText: 'JSON.convert()', isCorrect: false },
                  { optionText: 'JSON.object()', isCorrect: false }
                ]
              }
            },
            {
              questionText: 'What is the correct way to declare a variable in JavaScript?',
              marks: 1,
              explanation: 'var, let, and const are all valid variable declarations in JavaScript.',
              difficulty: 'EASY',
              options: {
                create: [
                  { optionText: 'var x;', isCorrect: false },
                  { optionText: 'let x;', isCorrect: false },
                  { optionText: 'const x = 10;', isCorrect: false },
                  { optionText: 'All of the above', isCorrect: true }
                ]
              }
            },
            {
              questionText: 'Which of the following is not a primitive type in JavaScript?',
              marks: 1,
              explanation: 'Object is not a primitive type. Primitive types include string, number, boolean, null, undefined, symbol, and bigint.',
              difficulty: 'MEDIUM',
              options: {
                create: [
                  { optionText: 'String', isCorrect: false },
                  { optionText: 'Number', isCorrect: false },
                  { optionText: 'Object', isCorrect: true },
                  { optionText: 'Boolean', isCorrect: false }
                ]
              }
            }
          ]
        }
      }
    })
    console.log("Created original 'JavaScript Fundamentals' quiz.")
  }

  const existingReactQuiz = await prisma.quiz.findFirst({ where: { title: 'React Basics' } })
  if (!existingReactQuiz) {
    await prisma.quiz.create({
      data: {
        title: 'React Basics',
        description: 'Check your understanding of React core concepts.',
        categoryId: categoryMap['React'],
        difficulty: 'MEDIUM',
        duration: 15,
        passingScore: 50,
        maxAttempts: 3,
        status: 'PUBLISHED',
        questions: {
          create: [
            {
              questionText: 'What hook is used to manage state in a functional component?',
              marks: 1,
              explanation: 'useState is the React hook for adding state to functional components.',
              difficulty: 'EASY',
              options: {
                create: [
                  { optionText: 'useEffect', isCorrect: false },
                  { optionText: 'useState', isCorrect: true },
                  { optionText: 'useContext', isCorrect: false },
                  { optionText: 'useReducer', isCorrect: false }
                ]
              }
            }
          ]
        }
      }
    })
    console.log("Created original 'React Basics' quiz.")
  }

  const existingHtmlQuiz = await prisma.quiz.findFirst({ where: { title: 'HTML 5 Mastery' } })
  if (!existingHtmlQuiz) {
    await prisma.quiz.create({
      data: {
        title: 'HTML 5 Mastery',
        description: 'Master the building blocks of the web.',
        categoryId: categoryMap['HTML'],
        difficulty: 'EASY',
        duration: 10,
        passingScore: 70,
        maxAttempts: 5,
        status: 'PUBLISHED',
        questions: {
          create: [
            {
              questionText: 'What does HTML stand for?',
              marks: 1,
              explanation: 'HTML stands for Hyper Text Markup Language.',
              difficulty: 'EASY',
              options: {
                create: [
                  { optionText: 'Hyper Text Preprocessor', isCorrect: false },
                  { optionText: 'Hyper Text Markup Language', isCorrect: true },
                  { optionText: 'Hyper Text Multiple Language', isCorrect: false },
                  { optionText: 'Hyper Tool Multi Language', isCorrect: false }
                ]
              }
            }
          ]
        }
      }
    })
    console.log("Created original 'HTML 5 Mastery' quiz.")
  }

  // --- Seed Massive Data ---
  const allData = [...webQuizzes, ...coreQuizzes];

  let addedQuizzes = 0;
  let addedQuestions = 0;
  
  for (const catData of allData) {
    const categoryId = categoryMap[catData.category];
    if (!categoryId) {
      console.warn(`Category ${catData.category} not found in map! Skipping.`);
      continue;
    }

    for (const qz of catData.quizzes) {
      // Check if quiz already exists
      const existing = await prisma.quiz.findFirst({
        where: { title: qz.title }
      });

      if (existing) {
        console.log(`Quiz '${qz.title}' already exists. Skipping.`);
        continue;
      }

      // Create new quiz
      const createdQuiz = await prisma.quiz.create({
        data: {
          title: qz.title,
          description: qz.description,
          categoryId: categoryId,
          difficulty: qz.difficulty || 'MEDIUM',
          duration: qz.duration || 15,
          passingScore: qz.passingScore || 60,
          maxAttempts: qz.maxAttempts || 3,
          status: 'PUBLISHED', // Enforce published status
          questions: {
            create: qz.questions.map(q => ({
              questionText: q.q,
              marks: q.marks || 1,
              explanation: q.exp,
              difficulty: qz.difficulty || 'MEDIUM',
              options: {
                create: q.o.map((optText, idx) => ({
                  optionText: optText,
                  isCorrect: idx === q.a
                }))
              }
            }))
          }
        }
      });
      addedQuizzes++;
      addedQuestions += qz.questions.length;
      console.log(`+ Created quiz: '${createdQuiz.title}' with ${qz.questions.length} questions.`);
    }
  }

  console.log('--------------------------------------------------');
  console.log(`Seeding Complete!`);
  console.log(`Added ${addedQuizzes} new quizzes and ${addedQuestions} new questions.`);
  console.log('Database seeded successfully and safely.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
