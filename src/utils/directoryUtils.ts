import { Question } from '../quiz'; // Import the Question interface from quiz module
import inquirer from 'inquirer'; // Import inquirer for command-line prompts
import path from 'path'; // Import path module for handling file paths
import fs from 'fs'; // Import fs module for file system operations

//Allows the creation of directories and files as well as changing directory within a question as needed.

// Function to create a new directory
export const createDirectory = async (dirName: string) => {
    const currentDir = process.cwd(); // Get the current working directory
    const targetDir = path.join(currentDir, dirName); // Create the full path for the new directory

    // Check if the directory already exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir); // Create the directory if it does not exist
        console.log(`Directory "${dirName}" created.`);
    } else {
        console.log(`Directory "${dirName}" already exists.`);
    }
};

// Function to create a new file
export const createFile = async (fileName: string) => {
    const currentDir = process.cwd(); // Get the current working directory
    const filePath = path.join(currentDir, fileName); // Create the full path for the new file

    // Check if the file already exists
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'This is an example file.'); // Create the file with some example content
        console.log(`File "${fileName}" created successfully.`);
    } else {
        console.log(`File "${fileName}" already exists.`);
    }
};

// Function to handle directory-related tasks based on the quiz question
export const handleDirectoryTask = async (question: Question) => {
    let currentDir = process.cwd(); // Get the current working directory

    let isCorrect = false; // Flag to track if the correct answer was provided

    // Loop until the correct answer is given
    while (!isCorrect) {
        // Prompt the user with the question
        const { answer } = await inquirer.prompt([
            {
                prefix: '\n-------------------------------------------------------------\n',
                type: 'input',
                name: 'answer',
                message: `[${currentDir}]\n${question.question}`
            }
        ]);

        // Check if the provided answer matches the correct answer
        if (answer.trim().toLowerCase() === question.correctAnswer.toLowerCase()) {
            isCorrect = true; // Set flag to true if the answer is correct

            // Handle directory creation task
            if (question.filetype === 'directory' && question.filename) {
                await createDirectory(question.filename);
            }
            // Handle file creation task
            else if (question.filetype === 'file' && question.filename) {
                await createFile(question.filename);
            }
            // Handle changing directory task
            else if (question.correctAnswer.startsWith('cd ')) {
                const dir = question.correctAnswer.split(' ')[1]; // Extract the directory name from the correct answer
                currentDir = path.join(currentDir, dir); // Create the full path for the new directory
                process.chdir(currentDir); // Change the current working directory
                console.log(`Changed directory to ${currentDir}`);
            }
        } else {
            console.log('Invalid input. Please try again.');
        }
    }
};