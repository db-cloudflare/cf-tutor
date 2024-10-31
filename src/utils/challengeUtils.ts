import { Question } from '../quiz';
import { spawn } from 'cross-spawn';
import readline from 'readline';
import path from 'path';

// challengeUtils is used for challenges scripts to allow the user to continue using the command line as a subprocess within the cloudflare-tutor app. The user can work on the challenge, and once the expected output has been detected the challenge is marked complete.
function hasErrorCode(err: any): err is { code: string } {
    return err && typeof err === 'object' && 'code' in err;
}

export const runCliTask = async (question: Question) => {
    const expectedOutput: string[] = question.expectedOutput ?? []; // Explicitly type as an array of strings

    if (expectedOutput.length === 0) {
        throw new Error('Expected output must be defined for CLI tasks.');
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let isCorrect = false;
    let output = '';
    let currentDir = process.cwd(); // Track the current working directory
    let activeProcesses = 0; // Track the number of active processes

    //console.log(`Monitoring terminal output for: ${expectedOutput}`);

    const monitorOutput = async () => {
        return new Promise<boolean>((resolve, reject) => {
            rl.on('line', (line) => {
                const [command, ...args] = line.trim().split(' ');

                // Handle the 'cd' command
                if (command === 'cd') {
                    if (args.length === 0) {
                        console.log('No directory specified');
                    } else {
                        const newDir = path.resolve(currentDir, args.join(' '));
                        try {
                            process.chdir(newDir);
                            currentDir = newDir;
                            console.log(`Changed directory to ${currentDir}`);
                        } catch (err) {
                            if (err instanceof Error) {
                                console.error(`Error changing directory: ${err.message}`);
                            } else {
                                console.error('Unknown error occurred while changing directory.');
                            }
                        }
                    }
                    return;
                }

                // Start the command process
                const cmd = spawn(command, args, { stdio: ['inherit', 'pipe', 'pipe'], cwd: currentDir });
                activeProcesses++; // Increment active processes count

                // Pause the readline interface while the command is running
                rl.pause();

                // Provide clearer error message if invalid input has been entered.
                cmd.on('error', (err) => {
                    if (err instanceof Error) {
                        if (hasErrorCode(err) && err.code === 'ENOENT') {
                            console.error(`Error: Command "${command}" not found. Please enter a valid command.`);
                        } else {
                            console.error(`Error: ${err.message}`);
                        }
                    } else {
                        console.error('Unknown error occurred.');
                    }
                });

                cmd.on('close', (code) => {
                    activeProcesses--; // Decrement active processes count

                    // Resume the readline interface after the command completes
                    rl.resume();

                    // Check if all processes are completed and expected output is found
                    if (activeProcesses === 0 && expectedOutput.some(eo => output.includes(eo))) {
                        isCorrect = true;
                        rl.close();
                        resolve(true);
                    } else {
                        if (activeProcesses === 0) {
                            console.log(`Command exited with code ${code}`);
                            console.log('Expected output not found yet.');
                        }
                    }
                });

                // Listen to the output from the command
                cmd.stdout?.on('data', (data) => {
                    const str = data.toString();
                    output += str;
                    console.log(str); // Optionally print the output for debugging
                    if (expectedOutput.some(eo => output.includes(eo)) && activeProcesses === 0) {
                        isCorrect = true;
                        rl.close();
                        resolve(true);
                    }
                });

                cmd.stderr?.on('data', (data) => {
                    const str = data.toString();
                    output += str;
                    console.error(str); // Optionally print the error output for debugging
                    if (expectedOutput.some(eo => output.includes(eo)) && activeProcesses === 0) {
                        isCorrect = true;
                        rl.close();
                        resolve(true);
                    }
                });
            });
        });
    };

    // Start monitoring the output
    await monitorOutput();

    // Ensure that the completion message is shown after all processes have finished
    if (isCorrect) {
        console.log('Correct output detected. Challenge complete!');
    } else {
        //console.log('Expected output was not found.');
    }
};