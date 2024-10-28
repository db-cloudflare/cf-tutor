import { Quiz, Question } from '../quiz';
import { runQuiz } from '../utils/runQuiz'; // Import runQuiz
import path from 'path';
import chalk from 'chalk';

const __dirname = path.resolve();

const Intro = `
${chalk.hex('##F28C28').bold('Welcome to the Cloudflare CLI Tutor!')}
`;

const Intro1 = `
${chalk.hex('##F28C28').bold('What is R2? ')}
`;

const Intro2 = `
${chalk.hex('##F28C28').bold('What is a bucket?')}
`;

const Intro3 = `
${chalk.hex('##F28C28').bold('Step 1. Create a Worker ')}
`;

const Intro4 = `
${chalk.hex('##F28C28').bold('Step 2. Create an R2 bucket ')}
`;

const Intro5 = `
${chalk.hex('##F28C28').bold('Step 3. Bind your bucket to your Worker')}
`;
const Intro6 = `
${chalk.hex('##F28C28').bold('Step 4. Test our R2 Bucket')}
`;
const Intro7 = `
${chalk.hex('##F28C28').bold('Step 5. Access our database using a Worker')}
`;
const Intro8 = `
${chalk.hex('##F28C28').bold('Step 6. Add security')}
`;
const Intro9 = `
${chalk.hex('##F28C28').bold('Congratulations!')}
`;
const Task = `
${chalk.hex('##F28C28').bold(`Task`)}
`;


const jsBindingExample = `
${chalk.blue('[[r2_buckets]]')}
${chalk.blue(`binding = 'MY_BUCKET' # <~ valid JavaScript variable name"`)}
${chalk.blue(`bucket_name = 'product-media-bucket' # <~ Make sure this matches your R2 bucket name`)}
`;

const accountIdExample = `
${chalk.hex('##CACFD2')('name = "<YOUR_WORKER_NAME>"')}
${chalk.hex('##CACFD2')('main = "src/index.js"')}
${chalk.hex('##CACFD2')(`compatibility_date = "YYYY-MM-DD"`)}
${chalk.hex('##CACFD2')(`account_id = "YOUR_ACCOUNT_ID" # ← Replace with your Account ID.`)}
${chalk.hex('##CACFD2')(`workers_dev = true`)}
`;



const workerCodeBlock1 = `
${chalk.blue(`			case 'PUT':`)}
${chalk.blue(`				await env.MY_BUCKET.put(key, request.body);`)}
${chalk.blue(`				return new Response(\`Put \${key} successfully!\`);`)}
`;

const workerCodeBlock2 = `
${chalk.blue(`			case 'GET':`)}
${chalk.blue('				const object = await env.MY_BUCKET.get(key);')}
${chalk.blue(``)}
${chalk.blue('				if (object === null) {')}
${chalk.blue(`					return new Response('Object Not Found', { status: 404 });`)}
${chalk.blue(`				}`)}
${chalk.blue(`		  `)}
${chalk.blue(`				const headers = new Headers();`)}
${chalk.blue(`				object.writeHttpMetadata(headers);`)}
${chalk.blue(`				headers.set('etag', object.httpEtag);`)}
${chalk.blue(`		  `)}
${chalk.blue(`				return new Response(object.body, {`)}
${chalk.blue(`					headers,`)}
${chalk.blue(`				});`)}
${chalk.blue(`		  `)}
`;

const workerCodeBlock3 = `
${chalk.blue(`			case 'DELETE':`)}
${chalk.blue(`				await env.MY_BUCKET.delete(key);`)}
${chalk.blue(`				return new Response('Deleted!');`)}
`;

const workerCodeBlock4 = `
${chalk.blue(`				return new Response('Method Not Allowed', {`)}
${chalk.blue(`					status: 405,`)}
${chalk.blue(`					headers: {`)}
${chalk.blue(`						Allow: 'PUT, GET, DELETE',`)}
${chalk.blue(`					},`)}
${chalk.blue(`				});`)}
`;

const workerCodeBlock5 = `
${chalk.blue(`const hasValidHeader = (request, env) => {`)}
${chalk.blue(`	return request.headers.get('X-Custom-Auth-Key') === env.AUTH_KEY_SECRET;`)}
${chalk.blue(`};`)}
`;

const workerCodeBlock6 = `
${chalk.blue(`function authorizeRequest(request, env, key) {`)}
${chalk.blue(`	switch (request.method) {`)}
${chalk.blue(`		case 'PUT':`)}
${chalk.blue(`		case 'DELETE':`)}
${chalk.blue(`		case 'GET':`)}
${chalk.blue(`			return hasValidHeader(request, env);`)}
${chalk.blue(`		default:`)}
${chalk.blue(`			return false;`)}
${chalk.blue(`	}`)}
${chalk.blue(`}`)}
`;

const workerCodeBlock7 = `
${chalk.blue(`	  if (!authorizeRequest(request, env, key)) {`)}
${chalk.blue(`		return new Response('Forbidden', { status: 403 });`)}
${chalk.blue(`	  }`)}
`;



const c3command = `
${chalk.blue('npm create cloudflare')}
`;

const loginCommand = `
${chalk.blue('npx wrangler login')}
`;

const deployCommand = `
${chalk.blue('npx wrangler deploy')}
`;

const r2CreateCommand = `
${chalk.blue('npx wrangler r2 bucket create product-media-bucket')}
`;

const r2UploadFile = `
${chalk.blue('npx wrangler r2 object put product-media-bucket/stereo.jpg --file=../media/stereo.jpg')}
`;

const r2DownloadFile = `
${chalk.blue('npx wrangler r2 object get product-media-bucket/stereo.jpg --file=../media/stereo-2.jpg')}
`;

const wranglerCommand = `
${chalk.blue('npx wrangler dev')}
`;

const wranglerWhoami = `
${chalk.blue('npx wrangler whoami')}
`;

const wranglerSecret = `
${chalk.blue('npx wrangler secret put AUTH_KEY_SECRET')}
`;

export const r2Quiz: Quiz = {
    category: 'Intro to R2',
    questions: [
        {
            question: `\n${Intro}\n\nIn this walkthrough, you will learn the following:
            \n\n - What is R2?
            \n - How to create a R2 bucket through a CLI
            \n - How to query the R2 bucket using a Worker
            \n\nTo get started, press 'Enter'\n\n`,
            type: 'text',
            correctAnswer: ''
        },
        {
            question: `\n${Intro1}\n\nCloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.\n\nExamples of large, unstructured data that can be stored with R2 include:\n\n- Storage for cloud-native applications\n- Cloud storage for web content\n- Storage for images, videos and audio\n- Data lakes (analytics and big data)\n- Cloud storage output for large batch processes\n\nPress 'Enter' to continue.\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            question: `\n${Intro2}\n\nIn R2, files or objects are stored in what are called 'buckets'. Think of a bucket as a container for your files or objects.\n\nPress 'Enter' to continue.\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            
            question: `\n${Task}\n\nAubrey owns an e-commerce website that stocks a wide variety of products. Each product has its own set of high-resolution images to advertise them and Aubrey is running out of space to store them. Let's help aubrey create an R2 bucket to store her product media assest.\n\nPress 'Enter' to begin\n\n`,
            type: 'text',
            correctAnswer: '',
        },
        {
            question: `\n${Intro3} \n\nTo do this, we will first create our Worker that will be used to query the R2 bucket. In this terminal below, enter the following to create your worker:\n${c3command}\nAfter running this command, for the purposes of this tutorial you want to select the following options:\n\n 1. Directory name: r2-cli-tutorial\n 2. Category: Hello World example\n 3. Template: Hello World Worker\n 4. Language: JavaScript\n 5. Select no to deploying\n\n`,
            type: 'text',
            correctAnswer: 'npm create cloudflare',
            npmCommand: ['npm', 'create', 'cloudflare']
        },
        {
            question: '\nNow that your Worker titled r2-cli-tutorial has been created, please change to the sub-directory by entering below into this terminal "cd" followed by the name of your Worker.\n\n',
            type: 'text',
            correctAnswer: 'cd r2-cli-tutorial',
            copyFile: ['./scaffolding/r2/index.js', './r2-cli-tutorial/src/index.js']
        },
        {
            question: `\nNow that we're in our Worker project folder, we will need to log in to Wrangler if we have not done so already. Logging into Wrangler connects our Wrangler tool with our Cloudflare account. In this process you may be prompted with an option to approve the login through your browser. To login, enter the following command:\n\n${loginCommand} \n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler login',
            npmCommand: ['npx', 'wrangler', 'login']
        },
        {
            question: `\n${Intro4}\n\nGreat! Next we will create our R2 bucket. To do this, enter into this terminal:\n${r2CreateCommand}\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler r2 bucket create product-media-bucket',
            npmCommand: ['npx', 'wrangler', 'r2', 'bucket', 'create', 'product-media-bucket']
        }
        ,
        {
            question: `\n${Intro5}\n\nNow that you have created your R2 bucket above, we will need to bind our Worker and bucket together.\nA binding is a way of connecting Cloudflare resources together so that they can interact. By binding our Worker to the R2 bucket, they will be able to communicate with each other.\n\n In your terminal below, enter the command below to get your account ID. This will be necessary to connect our Worker with our R2 bucket.\n\n${wranglerWhoami} \n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler whoami',
            npmCommand: ['npx', 'wrangler', 'whoami']
        }
        ,
        {
            question: `\n\nAbove you should have recieved account IDs for any accounts you have access to. Select the account ID of the account you created your R2 bucket with and copy it. Next, open your IDE and navigate to the cf-tutor/r2-cli-tutorial/wrangler.toml file. Copy and place the account details at the top of your file into the 'account_id' variable and add the 'workers_dev = true' variable below it. Below is an example of how this should look like:\n\n${accountIdExample}\nWhen you have completed this task, type 'done'\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNext, if you scroll down on the wrangler toml file, copy and paste the binding details below\n\n${jsBindingExample}\n\nWhen you have completed this task, type 'done'\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\n${Intro6}\n\nOur Worker and our R2 bucket are now connected. Let's test that our R2 bucket works by uploading an object to our R2 bucket directly from this CLI without using our Worker first. One of Aubrey's product images can be found in the cf-tutor/media folder. We'll upload this image, then download it again with a different name to test the R2 bucket.\n\nTo upload the image, run the following command in this terminal below\n${r2UploadFile}\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler r2 object put product-media-bucket/stereo.jpg --file=../media/stereo.jpg',
            npmCommand: ['npx', 'wrangler', 'r2', 'object', 'put', 'product-media-bucket/stereo.jpg', '--file=../media/stereo.jpg']
        }
        ,
        {
            question: `\nNow that the image has been uploaded to our bucket, let's try downloading it again but with a different name. To do this, run the command in this terminal below\n${r2DownloadFile}\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler r2 object get product-media-bucket/stereo.jpg --file=../media/stereo-2.jpg',
            npmCommand: ['npx', 'wrangler', 'r2', 'object', 'get', 'product-media-bucket/stereo.jpg', '--file=../media/stereo-2.jpg']
        }
        ,
        {
            question: `\n${Intro7}\nNow that we have a working R2 bucket, let's expand the Worker we created earlier so that it can do the following.\n\n 1. Upload objects.\n\n 2. Retrieve objects.\n\n 3. Delete objects.\n\n 4. Only allow those with authorization to perform the above tasks,.\n\n \n\nPress 'Enter' when you're ready to begin.\n\n`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\nNavigate to your IDE and open the cf-tutor/r2-cli-tutorial/src/index.js file to access your new worker's script file. We have placed the skeleton of what we will be performing in this script along with comments on what we will be adding. To give this Worker multiple functions we will be making use of case switching.\n\n \n\nPress 'Enter' when you're ready to begin.\n\n`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\nFirst, let's add a PUT method so that users can upload files to our R2 bucket through our Worker. underneath the comment 'Todo - PUT method', -paste the following script:\n\n ${workerCodeBlock1}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNext, let's add a GET method so that users can download files from our R2 bucket. Underneath the comment //Todo - GET method paste the following code block:\n\n ${workerCodeBlock2}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nLet's add a DELETE method so that users can delete files from our R2 bucket. Underneath the comment //Todo - GET method paste the following code block:\n\n${workerCodeBlock3}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNow we need to be able to handle unsupported methods. If a user tries to perform an action that our Worker doesn't support, the Worker should retrun a message to the user informing them of this. Underneath the comment Todo - handle unsupported methods, paste the following code block:\n\n${workerCodeBlock4}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\n${Intro8}\n\nGreat job! Now the Worker can support uploading, downloading and deleting files. If we deploy this Worker as is, it will be publically available for anyone to use. To make sure that only those with permission can interact with our Worker and in turn our R2 bucket, we need to add authorization logic.\n Press 'Enter' when you are ready to continue.\n\n`,
            type: 'text',
            correctAnswer: ''
        }
        ,
        {
            question: `\nTo only allow authorized requests, we will make use of what are known as secrets. A secret is a variable that can act as an auth key. In the next steps we will do the following\n\n 1. Add functionality to check that the request contains a alid auth key. \n\n 2. Allow put, delete and get methods if the auth key is correct \n\n 3. Only allow selected objects to be retrieved with a get method.\n\n 4. If an auth key is invalid, return a forbidden message.\n\n 5. Create the secret auth key.\n\n Press 'Enter' to continue`,
            type: 'text',
            correctAnswer: '',
        }
        ,
        {
            question: `\nFirst, let's check that the secret auth key has been recieved by our Worker from the request. Underneath the comment // Todo - Check requests for a pre-shared secret paste the following code block:\n\n${workerCodeBlock5}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNext, if the secret has been authorized let's allow the methods. Underneath the comment // Todo - authorize the secret, paste the following code block:\n\n${workerCodeBlock6}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNext, if the secret is not authorized let's return a forbidden 403 message. Underneath the comment //Todo - forbid unauthorized requests paste the following code block:\n\n${workerCodeBlock7}\n\nType 'done' when you are finished\n\n`,
            type: 'text',
            correctAnswer: 'done',
        }
        ,
        {
            question: `\nNow let's make our seecret that will be used to access our Worker. Enter ${wranglerSecret}. This will prompt you to enter a secret password. Remember this password, as it will be needed to access our Worker. \n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler secret put AUTH_KEY_SECRET',
            npmCommand: ['npx', 'wrangler', 'secret', 'put', 'AUTH_KEY_SECRET']
        }
        ,
        {
            question: `\nGreat!, Now that our Worker has bee finished, run the following commaned to deploy it:\n\n${deployCommand}\n\n`,
            type: 'text',
            correctAnswer: 'npx wrangler deploy',
            npmCommand: ['npx', 'wrangler', 'deploy']
        }
        ,
        {
            question: `\n${Intro9}\n\nGreat Job! This concludes the intro to R2. To test your Worker, do the following:\n\n 1. Press 'Enter' to exit this quiz.\n 2. Get the URL to access your Worker that was provided above after deploying your worker\n 3. Place your deployed worker's url path and your secret auth key where applicabe into the following cURL commands, then enter them into this command terminal:\n\nWrite an object without the secret, resulting in an error message being returned\ncurl https://*YOUR_WORKER_HERE*/stereo2.jpg -X PUT --data-binary @filepath/to/image.jpg\n\nWrite an object\ncurl https://*YOUR_WORKER_HERE*/image.jpg -X PUT --header "X-Custom-Auth-Key: *YOUR_SECRET_KEY*" --data-binary @filepath/to/image.jpg\n\nDownload an object\ncurl -o stereo-downloaded.jpg https://*YOUR_WORKER_HERE*/stereo.jpg --header "X-Custom-Auth-Key: *YOUR_SECRET_KEY*"\n\n To learn more about D1, visit our documentation here: https://developers.cloudflare.com/r2/\nPress 'Enter' to exit this quiz "
            `,
            type: 'text',
            correctAnswer: ''
        }
    ]
};

// Function to run the quiz
export const handleR2Quiz = async () => {
    await runQuiz(r2Quiz);
};