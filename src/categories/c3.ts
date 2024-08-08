import { Quiz, Question } from '../quiz';
import { runQuiz } from '../utils/runQuiz'; // Import runQuiz
import chalk from 'chalk';

const intro = `
${chalk.hex('##F28C28').bold('Welcome to the Cloudflare CLI Tutor!')}
`;

const intro1 = `
${chalk.hex('##F28C28').bold('What is a Worker? ')}
`;

const intro2 = `
${chalk.hex('##F28C28').bold('Creating a Worker with C3 ')}
`;

const intro3 = `
${chalk.hex('##F28C28').bold('Change directory into your Worker ')}
`;

const intro4 = `
${chalk.hex('##F28C28').bold('Login to Cloudflare with Wrangler ')}
`;

const intro5 = `
${chalk.hex('##F28C28').bold('Developing with Wrangler ')}
`;

const intro6 = `
${chalk.hex('##F28C28').bold('Deploying with Wrangler ')}
`;

const intro7 = `
${chalk.hex('##F28C28').bold('Finished ')}
`;

const jsCodeBlock = `
${chalk.blue('export default')} {
${chalk.blue('async')} ${chalk.yellow('fetch')}.log(${chalk.yellow('request, env, ctx')});
${chalk.blue('return')} ${chalk.yellow('new Response')}.log(${chalk.yellow('"Hello World! This is my first Worker!"')});
}
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

const wranglerDeploy = `
${chalk.blue('npx wrangler deploy')}
`;

export const c3Quiz: Quiz = {
    category: 'Intro to Workers, C3 and Wrangler',
    questions: [
        {
            question: `\n${intro} \n\n In this walkthrough, you will learn the following: \n\n - What are Cloudflare Workers \n\n - How to create a Worker through a CLI \n\n - How to run and test a Worker locally on your computer \n\n - How to deploy your Worker globally to the cloud. \n\nTo get started, press 'Enter'`,
            type: 'text',
            correctAnswer: ''
        },
        {
            question: `\n${intro1} \n\n Cloudflare Workers provides a serverless execution environment that allows you to deploy applications to the cloud that can then be used by other services or people globally.\nCloudflare Workers are primarily developed using either JavaScript or TypeScript.\nIn this walkthrough, you will create a very simple Worker that displays the text Hello World when it is accessed. \n\n Press 'Enter' to continue.`,
            type: 'text',
            correctAnswer: '',
        },
        {
            
            question: `\n${intro2} \n\nFirst we are going to create our Worker project. We will achieve this using C3 (create-cloudflare-cli). C3 is Cloudflare's CLI tool designed to create Cloudflare applications and set up scaffolding for different types of projects.\n\nType the following command in your terminal to install the package: \n\n ${c3command}\n\nAfter running this command, for the purposes of this tutorial you want to enter the following options:\n\n 1. Directory name: cli-tutorial-worker\n 2. Select Hello World Worker\n 3. Select JavaScript\n 4. Select no to connecting to Github\n 5. Select no to Deploying\n\n`,
            type: 'text',
            correctAnswer: 'npm create cloudflare',
            npmCommand: ['npm', 'create', 'cloudflare'],
            showCurrentDir: true
        },
        {
            question: `\n${intro3} \n\nNow that your Worker titled cli-tutorial-worker has been created, please change to the sub-directory by entering "cd" followed by the name of your Worker.\n\n`,
            type: 'text',
            correctAnswer: 'cd cli-tutorial-worker'
        },
        {
            question: `\n${intro4}\n\nNow that we're in our Worker project folder, we will now be using Wrangler, Cloudflare's CLI tool to develop and test Workers as well as interact with other Cloudflare resources. To make use of Wrangler with your Cloudflare account, you will first need to log in. Logging into Wrangler with your Cloudflare account connects the Wrangler tool with your Cloudflare account. In this process you may be prompted with an option to approve the login through your browser. To login, enter the following command:\n\n${loginCommand} \n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler login',
            npmCommand: ['npx', 'wrangler', 'login']
        },
        {
            question: `\nGreat! Now that the Worker has been created, you can open it in your Integrated Development Environment (IDE) or editing tool. Open the file under cf-tutor/cli-tutorial-worker/src/index.js in your development environment and change the string "Hello World!" to whatever you would like.\n${jsCodeBlock}\nType "done" and press Enter after you have added the code.\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\n${intro5}\n\nLet's test your Worker locally before deploying it to the cloud. To do this, we will be using Wrangler.\n\nType the command below.\n\n${wranglerCommand}\n\nRunning this will create a local server that runs your Worker. Once the server loads, press 'B' to open up the Worker on your browser and run your Worker.\n\nWhen you're finished, press 'x' to close your locally running Worker and move on to the next step.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler dev',
            npmCommand: ['npx', 'wrangler', 'dev']
        }
        ,
        {
            question: `\n${intro6}\n\nOnce you're happy with the result you can then deploy your Worker to be available globally on the cloud. To do this, enter ${wranglerDeploy}'.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler deploy',
            npmCommand: ['npx', 'wrangler', 'deploy']
        }
        ,
        {
            question: `\n${intro7}\n\nCongratulations! That concludes the introdution to Cloudflare Workers.\nFor more information, please visit our documentation at https://developers.cloudflare.com/workers/\n\nPress 'Enter' to complete this quiz \n\n`,
            type: 'text',
            correctAnswer: '',
        }
    ]
};

// Function to run the quiz
export const handleC3Quiz = async () => {
    await runQuiz(c3Quiz);
};