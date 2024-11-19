import { Question } from '../quiz';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import chalk from 'chalk';

const Error1 = `
${chalk.hex('#D22B2B').bold('Invalid input. Please type')}
`;

const Error2 = `
${chalk.hex('#D22B2B').bold('and press enter to run the command.')}
`;

// Function to handle npm tasks and commands as part of an answer to an assigned task.
export const handleNpmCommands = async (question: Question) => {
    const installPackage = async (command: string, args: string[]): Promise<void> => {
        return new Promise((resolve, reject) => {
            const child = spawn(command, args, { stdio: 'inherit' });
            let timeout: NodeJS.Timeout;

            // Function to clean up the child process
            const cleanUp = () => {
                clearTimeout(timeout);
                child.removeAllListeners();
            };

            // Listen for specific output if the command is 'npx wrangler login'
            if (command === 'npx' && args.includes('wrangler') && args.includes('login')) {
                child.on('data', (data) => {
                        const output = data.toString();
                        if (output.includes('Successfully logged in.')) {
                            cleanUp();
                            resolve();
                        }
                    });
                }

            // Listen for the 'close' event
            child.on('close', (code) => {
                cleanUp();
                if (code !== 0) {
                    reject(new Error(`Command failed with exit code ${code}`));
                } else {
                    resolve();
                }
            });

            // Listen for the 'error' event
            child.on('error', (err) => {
                cleanUp();
                reject(err);
            });

            // Set a timeout to forcefully kill the child process if it takes too long
            if (command === 'npx' && args.includes('wrangler') && args.includes('login')) {
           timeout = setTimeout(() => {
               cleanUp();
               resolve();
            }, 30000); // Adjust the timeout value as needed (e.g., 10 seconds)
        }
        });
    };

    let isCorrect = false;
    let currentDir = process.cwd(); // Get the current working directory
    while (!isCorrect) {
        const { answer } = await inquirer.prompt([
            {
                prefix: '\n-------------------------------------------------------------\n',
                type: 'input',
                name: 'answer',
                message: `[${currentDir}]\n${question.question}`,
                transformer: (input: string) => `$ ${input}`

            }
        ]);

        // Check if the answer is correct
        if (answer.trim().toLowerCase() === question.correctAnswer.toLowerCase()) {
            console.log(`Starting the npm/npx command`);
            if (question.npmCommand) {
                try {
                    await installPackage(question.npmCommand[0], question.npmCommand.slice(1));
                    console.log(`npm/npx task complete`);
                    isCorrect = true;
                } catch (error) {
                    // Type-cast error to Error before accessing its properties
                    if (error instanceof Error) {
                        console.error(`Error: ${error.message}`);
                    } else {
                        console.error('An unknown error occurred.');
                    }
                }
            } else {
                console.log(`No specified command`);
                isCorrect = true; // Move on to the next question since there's no command to run
            }
        } else {
            console.log(`${Error1}${question.correctAnswer}${Error2}`);
        }
    }
};