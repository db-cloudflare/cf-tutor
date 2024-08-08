import { Quiz, Question } from '../quiz';
import { handleNpmCommands } from './npmQuizUtils';
import { handleDirectoryTask } from './directoryUtils';
import { startQuestion } from '../quiz';
import fs, { copyFile } from 'fs';
import { runCliTask } from './challengeUtils';
import { copyFiles } from '../utils/copyFile';
import path from 'path';

const __dirname = path.resolve();

// Function to save quiz progress
const saveQuizProgress = (category: string) => {
    const progressDir = path.join(__dirname, './progress');
    if (!fs.existsSync(progressDir)) {
        fs.mkdirSync(progressDir);
    }

    const filePath = path.join(progressDir, `${category}.txt`);
    fs.writeFileSync(filePath, `Quiz "${category}" completed.`);
};

// Function to run a quiz, handle npm commands, and change / directory tasks
export const runQuiz = async (quiz: Quiz) => {
    for (const question of quiz.questions) {
        if (question.type === 'cli-task') {
            await runCliTask(question);
        } else if (question.npmCommand) {
            await handleNpmCommands(question);
            if (question.copyFile){
                const sourcePath = path.resolve(__dirname, question.copyFile[0]);
                const destinationPath = path.resolve(__dirname, question.copyFile[1]);
                await copyFiles(sourcePath, destinationPath)
            }
        } else if (question.correctAnswer.startsWith('cd ') || question.filetype) {
            await handleDirectoryTask(question);
            if (question.copyFile){
                const sourcePath = path.resolve(__dirname, question.copyFile[0]);
                const destinationPath = path.resolve(__dirname, question.copyFile[1]);
                await copyFiles(sourcePath, destinationPath)
            }
        } else {
            await startQuestion(question);
            if (question.copyFile){
                const sourcePath = path.resolve(__dirname, question.copyFile[0]);
                const destinationPath = path.resolve(__dirname, question.copyFile[1]);
                await copyFiles(sourcePath, destinationPath)
            }
        }

    }

    // Save quiz progress after completing all questions
    saveQuizProgress(quiz.category);
};