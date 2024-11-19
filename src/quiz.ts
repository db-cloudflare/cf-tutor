import inquirer from 'inquirer';
import chalk from 'chalk';

const Error = `
${chalk.hex('##F28C28').bold('Your input was incorrect. Please try again.')}
`;

// Interface representing a quiz question
export interface Question {
    question: string;
    type: 'multiple-choice' | 'text' | 'cli-task';
    choices?: string[];
    correctAnswer: string;
    npmCommand?: string[];
    filename?: string;
    filetype?: string;
    copyFile?: string[];
    cliCommand?: string;
    expectedOutput?: string[];
    showCurrentDir?: boolean; // Add this property to control directory display
}

// Interface representing a quiz
export interface Quiz {
    category: string;
    questions: Question[];
}

// Interface representing a quiz question in where an npm command is performed
export interface npmCommand {
    category: string;
}

// Function to start asking a question and handle the user's response
export const startQuestion = async (question: Question): Promise<boolean> => {
    let currentDir = process.cwd(); // Get the current working directory
    let isCorrect = false;

    //While the answer is correct, continue with function. This is so that the user can retry the task
    while (!isCorrect) {
        let answer: string;
        let message = `${question.question}`;

        // Default to false if showCurrentDir is not explicitly set to true
        const shouldShowCurrentDir = question.showCurrentDir === true;

        // Append current directory to the bottom if showCurrentDir is true
        if (shouldShowCurrentDir) {
            message += `\n\nCurrent Directory: [${currentDir}]`;
        }

        // Handle multiple-choice questions
        if (question.type === 'multiple-choice' && question.choices) {
            const response = await inquirer.prompt([
                {
                    prefix: '\n-------------------------------------------------------------\n',
                    type: 'list',
                    name: 'answer',
                    message: message,
                    choices: question.choices
                    
                }
            ]);
            answer = response.answer;
        } else {
            // Handle text input questions
            const response = await inquirer.prompt([
                {
                    prefix: '\n-------------------------------------------------------------\n',
                    type: 'input',
                    name: 'answer',
                    message: message
                }
            ]);
            answer = response.answer.trim();
        }
        // Check if the answer is correct
        if (answer.toLowerCase() === question.correctAnswer.toLowerCase()) {
            //console.log('Correct!');
            isCorrect = true;
        } else {
            console.log(Error);
        }
    }
    return true;
};

export const startQuiz = async (quiz: Quiz) => {
    let score = 0;

    for (const question of quiz.questions) {
        const isCorrect = await startQuestion(question);
        if (isCorrect) {
            score++;
        }
    }
    console.log(`You scored ${score} out of ${quiz.questions.length}.`);
};