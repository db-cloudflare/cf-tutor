import { Quiz, Question } from '../quiz';
import { runQuiz } from '../utils/runQuiz'; // Import runQuiz
import chalk from 'chalk';

const intro = `
${chalk.hex('##F28C28').bold('Welcome to the Cloudflare CLI Tutor!')}
`;

const intro1 = `
${chalk.hex('##F28C28').bold('What is Workers AI? ')}
`;

const intro2 = `
${chalk.hex('##F28C28').bold('Create an Worker that communicates with an LLM')}
`;

const intro3 = `
${chalk.hex('##F28C28').bold('Step 1. Create a Worker ')}
`;

const intro4 = `
${chalk.hex('##F28C28').bold('Step 2. Add the binding ')}
`;

const intro5 = `
${chalk.hex('##F28C28').bold('Step 3. Add prompting functionality to our Worker')}
`;
const intro6 = `
${chalk.hex('##F28C28').bold('Step 4. Instruct the LLM how it should respond')}
`;
const intro7 = `
${chalk.hex('##F28C28').bold('Congratulations!')}
`;

const bindingExample = `
${chalk.blue('[[ai]]')}
${chalk.blue('binding = "AI"')}
`;

const workerCodeBlock1 = `
${chalk.blue('export interface Env {')}
${chalk.blue('  AI: Ai;')}
${chalk.blue(`}`)}
${chalk.green(`//Todo - add default function`)}
`;

const workerCodeBlock2 = `
${chalk.blue('export default {')}
${chalk.blue('  async fetch(request, env): Promise<Response> {')}
${chalk.blue(`    const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {`)}
${chalk.blue('      prompt: "What is the origin of the phrase Hello, World",')}
${chalk.blue(`    });`)}
${chalk.blue(``)}
${chalk.blue(`    return new Response(JSON.stringify(response));`)}
${chalk.blue(`  },`)}
${chalk.blue(`} satisfies ExportedHandler<Env>;`)}
`;

const workerCodeBlock3 = `
${chalk.blue(`export default {`)}
${chalk.blue(`	async fetch(request: Request, env: Env) {`)}
${chalk.blue(`		let prompt = {`)}
${chalk.blue(`				messages: [`)}
${chalk.blue(`					{ role: "system", content: "Pretend you do not know the answer"},`)}
${chalk.blue(`					{ role: "user", content: "What is 2+2?"},`)}
${chalk.blue(`				]`)}
${chalk.blue(`			};`)}
${chalk.blue(`		const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', prompt`)}
${chalk.blue(`	);`)}
${chalk.blue(`	return new Response(JSON.stringify(response));`)}
${chalk.blue(`  },`)}
${chalk.blue(`};`)}
`;

const c3command = `
${chalk.blue('npm create cloudflare')}
`;

const loginCommand = `
${chalk.blue('npx wrangler login')}
`;

const wranglerCommand = `
${chalk.blue('npx wrangler dev')}
`;

export const aiQuiz: Quiz = {
    category: 'Intro to Workers AI',
    questions: [
        {
            question: `\n${intro}\n\nIn this walkthrough, you will learn the following: \n\n - What is Workers AI? \n\n - How to create a D1 database through a CLI \n\n - How to query the D1 database using a Worker \n\nTo get started, press 'Enter'\n\n`,
            type: 'text',
            correctAnswer: ''
        },
        {
            question: `\n${intro1}\n\nWorkers AI allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via the Cloudflare API.\n\nWorkers AI includes many different models built for different purposes, from Large Language Models (LLMs) to generate text based on a prompt, to Image Generation models to create images based on a text prompt.\n\nPress 'Enter' to continue\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            question: `\n${intro2} \n\nLet's create a Worker that can send a prompt to a Large Language Model and recieve a response from the model. We will also look at how to instruct the model to respond in a specified way.\n\nPress 'Enter' to continue\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            question: `\n${intro3} \n\nTo do this, we will first create our Worker that will query the AI models available on Cloudflare. In this terminal below, enter the following to create your worker: \n${c3command}\nAfter running this command, for the purposes of this tutorial you want to select the following options:\n\n 1. Directory name: ai-cli-tutorial\n 2. Category: Hello World example\n 3. Template: Hello World Worker\n 3. Language: Typescript\n 5. No to Deploying\n\n`,
            type: 'text',
            correctAnswer: 'npm create cloudflare',
            npmCommand: ['npm', 'create', 'cloudflare']
        },
        {
            question: '\nNow that your Worker titled ai-cli-tutorial has been created, please change to the sub-directory by entering below into this terminal "cd" followed by the name of your Worker.\n\n',
            type: 'text',
            correctAnswer: 'cd ai-cli-tutorial'
        },
        {
            question: `\nNow that we're in our Worker project folder, we will need to log in to Wrangler. Logging into Wrangler connects our Wrangler tool with our Cloudflare account. In this process you may be prompted with an option to approve the login through your browser. To login, enter the following command into this terminal:\n\n${loginCommand}\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler login',
            npmCommand: ['npx', 'wrangler', 'login']
        },
        {
            question: `\n${intro4}\n\nNow that we have our Worker, we can now bind it to Workers AI. Bindings are used to define the resources you would like to enable your Worker to connect with, such as Workers AI. To create a binding with Workers AI, open your Worker in your IDE (Integrated Development Environment) and add the following to your wrangler.toml file:\n\n${bindingExample}\n\nPress 'Enter' when you are finished.\n\n`,
            type: 'text',
            correctAnswer: ''
        },
        {
            question: `\nGreat! Now in your IDE, open up the src/index.ts file. We're going to place the binding variable into this file so that we can make use of it within TypeScript. To do this, delete everything that currently exists in the index.ts file and paste in the following:\n\n${workerCodeBlock1}\n\nType 'done' when you are finished.\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\n${intro5}\n\nNow that our binding is ready to use, let's instruct a model with a basic prompt. The model we will use for this example is Meta's llama 3.1. Paste the following into your script underneath the //Todo - add default function comment:\n\n${workerCodeBlock2}\n\nWhen you have completed this task, type 'done'.\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nTo test your Worker, enter the following command into this terminal below\n\n${wranglerCommand}\n\nThen press 'b' to open yor Worker on the browser. The Worker should then return a response to the prompt provided within the index.ts file.\n\nWhen you're finished, press 'x' to close your locally running Worker and move on to the next step.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler dev',
            npmCommand: ['npx', 'wrangler', 'dev']
        }
        ,
        {
            question: `\n${intro6}\n\nLastly, if you would like to specify to the LLM how you would like it to respond, we can do this by not only sending our prompt, but also a system instruction to the LLM. To do this, we will need to refactor our export default function so that the prompt sent to the LLM is an array containing both the prompt request as well as the system instruction to the LLM. Replace the existing export default function with the following code block:\n\n${workerCodeBlock3}\n\nType 'done' when you are finished.\n\n`,
            type: 'text',
            correctAnswer: 'done'
        }
        ,
        {
            question: `\nTo test the changes made to your Worker, enter the following command into this terminal below\n\n${wranglerCommand}\n\nThen press 'b' to open yor Worker on the browser. The Worker should then return a response to the prompt provided within the index.ts file.\n\nWhen you're finished, press 'x' to close your locally running Worker and conclude this introduction.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler dev',
            npmCommand: ['npx', 'wrangler', 'dev']
        }
        ,
        {
            question: `\n${intro7}\n\nCongratulations! That concludes the introdution to Workers AI. For more information, please visit our documentation at https://developers.cloudflare.com/workers-ai/\n\nPress enter to complete this introduction.\n\n`,
            type: 'text',
            correctAnswer: '',
        }
    ]
};

// Function to run the quiz
export const handleAIQuiz = async () => {
    await runQuiz(aiQuiz);
};