import { Quiz } from '../quiz';
import { runQuiz } from '../utils/runQuiz';
import chalk from 'chalk';

const intro = `
${chalk.hex('##F28C28').bold('Create a basic Worker')}
`;

const intro1 = `
${chalk.hex('##F28C28').bold('Start!')}
`;

export const challenge: Quiz = {
    category: 'Create a basic Worker',
    questions: [
        {
            question: `\n${intro}\n\nFor this challenge, please open up the folder cloudflare-tutor/challenge_files/worker_challenge. The files required to complete this challenge are located there.\n\n Create a JavaScript Worker and replace the index.js file of the Worker with the file located in the worker-challenge folder. This file is incomplete and contains errors such as missing if/else statements that need to be fixed. Once fixed, deploy the worker and enter the following cURL command into this terminal. Be sure to replace *your-worker-name* with the name of your Worker.\n\ncurl https://*your-worker-name*.workers.dev/success\n\nYou will be able to use this terminal to interact with C3 and Wrangler, change directory and enter the CURL command to recieve responses from your Worker. Press Enter to start the challenge.`,
            type: 'text',
            correctAnswer: '',

        },
        {
            question: `\n${intro1}\n\nTo help you with this challenge, use the following documentation: https://developers.cloudflare.com/workers/`,
            type: 'cli-task',
            correctAnswer: '',
            expectedOutput: [`I have completed my first Cloudflare CLI Tutor challenge!`]
        }
    ]
};

// Function to run the challenge
export const handleChallenge = async () => {
    await runQuiz(challenge);
};