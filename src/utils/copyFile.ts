import fs from 'fs';
import path from 'path';

//Handles copying scaffolding files into the user's newly generated Worker to assist with writing scripts in quizzes.

export const copyFiles = async (source: string, destination: string) => {
    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);
    
    try {
        await fs.promises.copyFile(sourcePath, destinationPath);
        //console.log('index.js file copied successfully.');
    } catch (error) {
        console.error('Error copying index.js file:', error);
    }
};