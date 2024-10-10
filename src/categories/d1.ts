import { Quiz, Question } from '../quiz';
import { runQuiz } from '../utils/runQuiz'; // Import runQuiz
import chalk from 'chalk';

const intro = `
${chalk.hex('##F28C28').bold('Welcome to the Cloudflare CLI Tutor!')}
`;

const intro1 = `
${chalk.hex('##F28C28').bold('What is D1? ')}
`;

const intro2 = `
${chalk.hex('##F28C28').bold('Help Gerard build a relational database')}
`;

const intro3 = `
${chalk.hex('##F28C28').bold('Step 1. Create a Worker ')}
`;

const intro4 = `
${chalk.hex('##F28C28').bold('Step 2. Add the binding ')}
`;

const intro5 = `
${chalk.hex('##F28C28').bold('Step 3. Add a table to your database')}
`;
const intro6 = `
${chalk.hex('##F28C28').bold('Step 4. Validate our database')}
`;
const intro7 = `
${chalk.hex('##F28C28').bold('Step 5. Access our database using a Worker')}
`;
const intro8 = `
${chalk.hex('##F28C28').bold('Step 6. Test your Worker')}
`;
const intro9 = `
${chalk.hex('##F28C28').bold('Congratulations!')}
`;

const schemaCodeBlock = `
${chalk.blue('DROP TABLE IF EXISTS Records;')}
${chalk.blue('CREATE TABLE IF NOT EXISTS Records (AlbumId INTEGER PRIMARY KEY, AlbumName TEXT, ArtistName TEXT, AlbumYear DATE);')}
${chalk.blue(`INSERT INTO Records (AlbumID, AlbumName, ArtistName, AlbumYear) VALUES (1, 'A Kind of Magic', 'Queen', 1986-06-02), (2, 'Ride the Lightning', 'Metallica', 1987-07-27)`)}
`;

const workerCodeBlock1 = `
${chalk.blue('export interface Env {')}
${chalk.blue('	DB: D1Database;')}
${chalk.blue(`}`)}
${chalk.green(`//Todo - add default function`)}
`;

const workerCodeBlock2 = `
${chalk.blue('export default {')}
${chalk.blue('	async fetch(request, env): Promise<Response> {')}
${chalk.blue('		const { pathname } = new URL(request.url);')}
${chalk.green('		//Todo - return Queen albums with specific path')}
${chalk.blue(`	},`)}
${chalk.blue(`} satisfies ExportedHandler<Env>;`)}
`;

const workerCodeBlock3 = `
${chalk.blue(`		if (pathname === "/api/queen") {`)}
${chalk.blue(`			const { results } = await env.DB.prepare(`)}
${chalk.blue(`				"SELECT * FROM Records WHERE ArtistName = ?"`)}
${chalk.blue(`			)`)}
${chalk.blue(`				.bind("Queen")`)}
${chalk.blue(`				.all();`)}
${chalk.blue(`			return Response.json(results);`)}
${chalk.blue(`		}`)}
${chalk.blue(`		return new Response(`)}
${chalk.blue(`			"Add /api/queen to the end of the localhost address above to see all Queen albums on the database"`)}
${chalk.blue(`		);`)}
`;

const c3command = `
${chalk.blue('npm create cloudflare')}
`;

const loginCommand = `
${chalk.blue('npx wrangler login')}
`;

const d1CreateCommand = `
${chalk.blue('npx wrangler d1 create record-d1-tutorial')}
`;

const d1ExecuteTableCommand = `
${chalk.blue('npx wrangler d1 execute record-d1-tutorial --local --file=./schema.sql')}
`;

const d1ValidateTableCommand = `
${chalk.blue('npx wrangler d1 execute record-d1-tutorial --local --command="SELECT * FROM Records"')}
`;

const wranglerCommand = `
${chalk.blue('npx wrangler dev')}
`;

export const d1Quiz: Quiz = {
    category: 'Intro to D1',
    questions: [
        {
            question: `\n${intro}\n\nIn this walkthrough, you will learn the following: \n\n - What is D1? \n\n - How to create a D1 database through a CLI \n\n - How to query the D1 database using a Worker \n\nTo get started, press 'Enter'\n\n`,
            type: 'text',
            correctAnswer: ''
        },
        {
            question: `\n${intro1}\n\nD1 is Cloudflare’s serverless relational SQL database. Relational databases can be used to store vast amounts of data that are related to one another, such as a student name and the course they are attending.\n\nCommands called SQL queries can then be used to perform tasks utilizing this data, such as only searching for students who attend a specific course.\n\nPress 'Enter' to continue.\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            
            question: `\n${intro2} \n\nGerard recently set up a record store, but quickly realised they are having great difficulty organizing and keeping track of their current stock. They've asked you to help create a database that can keep track of the following:\n\n - Album name \n\n - Artist name \n\n - Year of release \n\nPress 'Enter' to continue\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            question: `\n${intro3} \n\nTo do this, we will first create our Worker that will be used to query the database. In this terminal below, enter the following to create your worker: \n${c3command}\nAfter running this command, for the purposes of this tutorial you want to enter the following options:\n\n 1. Directory name: d1-cli-tutorial\n 2. Category: Hello World example\n 3. Template: Hello World Worker\n 4. Language: Typescript\n 5. No to Deploying\n\n`,
            type: 'text',
            correctAnswer: 'npm create cloudflare',
            npmCommand: ['npm', 'create', 'cloudflare']
        },
        {
            question: '\nNow that your Worker titled d1-cli-tutorial has been created, please change to the sub-directory by entering below into this terminal "cd" followed by the name of your Worker.\n\n',
            type: 'text',
            correctAnswer: 'cd d1-cli-tutorial'
        },
        {
            question: `\nNow that we're in our Worker project folder, we will need to log in to Wrangler if we have not done so already. Logging into Wrangler connects our Wrangler tool with our Cloudflare account. In this process you may be prompted with an option to approve the login through your browser. To login, enter the following command:\n\n${loginCommand} \n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler login',
            npmCommand: ['npx', 'wrangler', 'login']
        },
        {
            question: `\nGreat! Next we will create our D1 database. To do this, enter into this terminal:\n${d1CreateCommand}\nOnce you enter this, you will also be presented with the binding details. We'll explain what to do with this in the next step.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler d1 create record-d1-tutorial',
            npmCommand: ['npx', 'wrangler', 'd1', 'create', 'record-d1-tutorial']
        }
        ,
        {
            question: `\n${intro4}\n\nNow that you have created your D1 database above, you should have recieved an output that contains the array [[d1_databases]] followed by a binding variable, database_name variable and database_id variable. These details are used to establish a binding.\nA binding is a way of connecting Cloudflare resources together so that they can interact. By binding our Worker to the D1 database, they will be able to communicate with each other.\n\n In your IDE (Integrated Development Environment), Navigate to your wrangler.toml file which should be located at cf-tutor/d1-cli-tutorial/wrangler.toml and copy and paste the binding details that were outputted above into the file. The wrangler.toml file should already contain comments as examples for what a binding should look like and where the D1 binding should go.\n\nWhen you have completed this task, type 'done'\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\n${intro5}\n\nOur Worker and our D1 database are now connected. Next, let's add a table to our D1 database. A table holds rows of specified data. A relational database can contain multiple tables for different categories of data. For this exercise, we will create one table titled 'Records' that contains fields for the data ID, album name, album year and artist name.\n\nPress 'Enter' to continue.`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\nTo create a table, we must first create a schema.sql file. This file will contain the SQL command that we will run to create the table and the data types that it will contain.\n\n 1. Open the cf-tutor folder in your IDE. \n\n 2. Under the d1-cli-tutorial folder, create a new file called schema.sql. \n\n 3. Paste the SQL query below into your schema file.\n\n ${schemaCodeBlock}\n\n This SQL query creates a table called records, containing two albums.\n\nType 'done' when you have completed this task.\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNow that we have our .sql file that contains instructions on the table we want to create, we can run these instructions on our database. To do this, run the following command in this terminal below\n\n ${d1ExecuteTableCommand}\n\nThe '--local' flag means that this table is only being create on our local device for testing purposes and is not available globally on the cloud.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler d1 execute record-d1-tutorial --local --file=./schema.sql',
            npmCommand: ['npx', 'wrangler', 'd1', 'execute', 'record-d1-tutorial', '--local', '--file=./schema.sql' ]
        }
        ,
        {
            question: `\n${intro6}\n\nNow let's validate our database by running a search query to retrieve data. We'll perform a search query to retrieve everything from the 'Records' table. To do this enter the following command in this terminal\n\n ${d1ValidateTableCommand}\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler d1 execute record-d1-tutorial --local --command="SELECT * FROM Records"',
            npmCommand: ['npx', 'wrangler', 'd1', 'execute', 'record-d1-tutorial', '--local', '--command="SELECT * FROM Records"' ]
        }
        ,
        {
            question: `\n${intro7}\n\nNext, let's expand our Worker so that it can query the database for us. Let's try and make this Worker capable of querying select bands depending on the URL path that the Worker is accessed with.\n\nWe'll go through this step by step.\n\n 1. Go to your IDE and navigate to the cf-tutor/d1-cli-tutorial/src folder.\n 2. Open the index.ts file and delete everything in it\n 3. Copy and paste the below code block into it.\n\nThese lines of script establish the D1 binding in this file so that we can refer to it in functions.\n\n ${workerCodeBlock1}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNow we will set up the default function of our Worker. Under the d1-cli-tutorial/src/index.ts file in your IDE, replace the '//Todo - add default function' comment with the following code block: \n\n ${workerCodeBlock2}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nLastly, include the following script inside your export default function. The if statement of this script checks to see if the Worker has been accessed with the path /api/queen/ at the end. If it has, it will return only albums by Queen.\n\nIn your IDE, replace the '//Todo - return Queen albums with specific path' comment from the previous code block with the following.\n\n${workerCodeBlock3}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\n${intro8}\n\nTo test your Worker, enter the following command into this terminal below\n\n${wranglerCommand}\n\nThen press 'b' to open yor Worker on the browser, then try adding /api/queen to the end of the URL.\n\nWhen you're finished, press 'x' to close your locally running Worker and move on to the next step.\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler dev',
            npmCommand: ['npx', 'wrangler', 'dev']
        }
        ,
        {
            question: `\n${intro9}\n\nGerard now has the basis of a database and a Worker they can use to organize their record store!\n\nThis concludes the introduction to D1. For more information, please visit our documentation at https://developers.cloudflare.com/d1/\n\n Press 'Enter' to complete this introduction.\n\n`,
            type: 'text',
            correctAnswer: ''
        }
    ]
};

// Function to run the quiz
export const handleD1Quiz = async () => {
    await runQuiz(d1Quiz);
};