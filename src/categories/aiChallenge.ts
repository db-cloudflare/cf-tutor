import chalk from 'chalk';
import { Quiz } from '../quiz';
import { runQuiz } from '../utils/runQuiz';
import { Chalk } from 'chalk';

const intro1 = `
${chalk.hex('##F28C28').bold('Create a Worker that can determine sentiment using AI')}
`;

const intro2 = `
${chalk.hex('##F28C28').bold('Local or remote')}
`;

const intro3 = `
${chalk.hex('##F28C28').bold('Start!')}
`;

export const aiChallenge: Quiz = {
    category: 'Create a Worker that can determine sentiment using AI',
    questions: [
        {
            question: `\n${intro1}\n\nYour task is to set up a Worker that asks an LLM to determine whether a prompt is positive or negative in sentiment. The response from the LLM must respond with one of the two below strings based on the prompt:\n\nThe sentiment of this prompt is POSITIVE.\nOR\nThe sentiment of this prompt is NEGATIVE.\n\nPress Enter to continue.`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\n${intro2}\n\nYou can complete this challenge in two different ways:\n\nLocally:\nCreate a local version of your database, then open a second command terminal to run your Worker locally. Once your local Worker is running, enter the cURL command in this terminal to access it. In this case, the cURL command for a locally hosted Worker should look something like this: curl http://*local-host-number*\n\nRemotely:\nDeploy your databaase and Worker remotely, then enter the cURL command to access your deployed Worker in this terminal.\n\nThe CURL command for a remotely deployed Worker should look something like this: curl https://*your-worker-name*.workers.dev\n\nYou will be able to use this terminal to interact with C3 and Wrangler, change directory and enter the CURL command to recieve responses from your Worker. Press Enter to start the challenge.`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\n${intro3}\n\nTo help you with this challenge, use the following documentation: https://developers.cloudflare.com/workers-ai/\n\n`,
            type: 'cli-task',
            correctAnswer: '',
            expectedOutput: [`The sentiment of this prompt is POSITIVE.`, `The sentiment of this prompt is NEGATIVE.`]
        }
    ]
};

// Function to run the challenge
export const handleAiChallenge = async () => {
    await runQuiz(aiChallenge);
};