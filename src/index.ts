import { default as inquirer } from 'inquirer';
import { startQuiz, Quiz } from './quiz';
import { c3Quiz, handleC3Quiz } from './categories/c3';
import { d1Quiz, handleD1Quiz } from './categories/d1';
import { r2Quiz, handleR2Quiz } from './categories/r2';
import { aiQuiz, handleAIQuiz } from './categories/ai';
import { challenge, handleChallenge } from './categories/workerChallenge';
import { d1Challenge, handleD1Challenge } from './categories/d1Challenge';
import { aiChallenge, handleAiChallenge } from './categories/aiChallenge';
import { default as figlet } from 'figlet';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const intro = `
${chalk.hex('##F28C28').bold('Welcome to the Cloudflare CLI Tutor!')}
`;

const exp = `
${chalk.hex('##50C878').bold('Experience level: ')}
`;

const __dirname = path.resolve();

const quizzes: Quiz[] = [
    c3Quiz,
    d1Quiz,
    r2Quiz,
    aiQuiz
];

const challenges: Quiz[] = [
    challenge,
    d1Challenge,
    aiChallenge
]

// Function to check if a quiz has been completed
const isQuizCompleted = (category: string): boolean => {
    const progressDir = path.join(__dirname, './progress');
    const filePath = path.join(progressDir, `${category}.txt`);
    return fs.existsSync(filePath);
};
const countProgressFiles = async (): Promise<number> => {
    try {
        const progressDir = path.resolve(__dirname, './progress');
        const files = await fs.promises.readdir(progressDir);
        return files.length;
    } catch (error) {
        console.error('Error reading progress directory:', error);
        return 0;
    }
};

// Function to select a quiz category
const selectQuizCategory = async (): Promise<Quiz | undefined> => {
    const quizChoices = quizzes.map(quiz => {
        const completed = isQuizCompleted(quiz.category);
        return { name: completed ? `${quiz.category} ✔` : quiz.category, value: quiz };
    });

    const challengeChoices = challenges.map(challenge => {
        const completed = isQuizCompleted(challenge.category);
        return { name: completed ? `${challenge.category} ✔` : challenge.category, value: challenge };
    });

    const choices = [
        new inquirer.Separator('--- Introductions ---'),
        ...quizChoices,
        new inquirer.Separator('--- Challenges ---'),
        ...challengeChoices,
    ];

    // Prompt the user to choose a quiz category
    const { selectedQuiz } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedQuiz',
            message: 'Choose an introduction or challenge:',
            choices
        }
    ]);

    // Return the selected quiz or challenge object
    return selectedQuiz;
};

// Main function to run the application
const run = async () => {
    console.log('\n\n');
    console.log(figlet.textSync('Cloudflare CLI Tutor', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));

    console.log(`\n`+intro);
    const count = await countProgressFiles();
    console.log(`${exp}${count}\n`);
    console.log(`To exit this application at any point, press 'CTRL + C' on Windows or 'CMD + .' on Mac \n`);
    const quiz = await selectQuizCategory();
    if (quiz) {
        // Handle specific categories differently
        if (quiz.category === 'Intro to Workers, C3 and Wrangler') {
            await handleC3Quiz();
        } else if (quiz.category === 'Intro to D1') {
            await handleD1Quiz();
        } else if (quiz.category === 'Intro to R2') {
            await handleR2Quiz();
        } else if (quiz.category === 'Intro to Workers AI') {
            await handleAIQuiz();
        } else if (quiz.category === 'Create a basic Worker') {
            await handleChallenge();
        } else if (quiz.category === 'Create a Worker that can join two D1 database tables') {
            await handleD1Challenge();
        } else if (quiz.category === 'Create a Worker that can determine sentiment using AI') {
            await handleAiChallenge();
        } else {
            await startQuiz(quiz);
        }
    } else {
        console.log('No quiz found');
    }
};

run();