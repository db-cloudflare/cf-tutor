import chalk from 'chalk';
import { Quiz } from '../quiz';
import { runQuiz } from '../utils/runQuiz';

const intro = `
${chalk.hex('##F28C28').bold('D1 Challenge')}
`;

const intro1 = `
${chalk.hex('##F28C28').bold('Task')}
`;

const intro2 = `
${chalk.hex('##F28C28').bold('Local or remote')}
`;

const intro3 = `
${chalk.hex('##F28C28').bold('Start!')}
`;

export const d1Challenge: Quiz = {
    category: 'Create a Worker that can join two D1 database tables',
    questions: [
        {
            question: `\n${intro}\n\n For this challenge, please open up the folder cloudflare-tutor/challenge_files/d1_challenge. The files required to complete this challenge are located there.\n\nPress Enter to continue\n\n`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\n${intro1}\n\nYour task is to set up a Worker that can display joined data from two different tables on a database. The database contains a table of Employees and a table of Companies.\n\nWhen you have created the database and Worker, use the Worker to retrieve the following response: [{"EmployeeID":1,"EmployeeName":"Olivia Johnson","CompanyName":"TV Media"},{"EmployeeID":2,"EmployeeName":"Noah Jones","CompanyName":"Software Co."},{"EmployeeID":3,"EmployeeName":"James Smith","CompanyName":"Soda Co."},{"EmployeeID":4,"EmployeeName":"Sophia Martinez","CompanyName":"TV Media"}]\n\nPress Enter to continue.`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\n${intro2}\n\nYou can complete this challenge in two different ways:\n\nLocally:\nCreate a local version of your database, then open a second command terminal to run your Worker locally. Once your local Worker is running, enter the cURL command in this terminal to access it. In this case, the cURL command for a locally hosted Worker should look something like this: curl http://*local-host-number*/api/companies\n\nRemotely:\nDeploy your databaase and Worker remotely, then enter the cURL command to access your deployed Worker in this terminal.\nThe cURL command for a remote Worker should look something like this: curl https://*your-worker-name*.workers.dev/api/companies\n\nYou will be able to use this terminal to interact with C3 and Wrangler, change directory and enter the CURL command to recieve responses from your Worker. Press Enter to start the challenge.`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\n${intro3}\n\nTo help you with this challenge, use the following documentation: https://developers.cloudflare.com/d1/\n\n`,
            type: 'cli-task',
            correctAnswer: '',
            expectedOutput: [`[{"EmployeeID":1,"EmployeeName":"Olivia Johnson","CompanyName":"TV Media"},{"EmployeeID":2,"EmployeeName":"Noah Jones","CompanyName":"Software Co."},{"EmployeeID":3,"EmployeeName":"James Smith","CompanyName":"Soda Co."},{"EmployeeID":4,"EmployeeName":"Sophia Martinez","CompanyName":"TV Media"}]`]
        }
    ]
};

// Function to run the challenge
export const handleD1Challenge = async () => {
    await runQuiz(d1Challenge);
};