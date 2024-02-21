// import the fs module
import fs from 'fs';

// create an async function using promise to check if the file exists
export const checkFile = (filePath: string): Promise<boolean> => {
    // return a promise
    return new Promise((resolve, reject) => {
        // check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            // if the file exists
            if (!err) {
                // resolve the promise
                resolve(true);
            } else {
                // reject the promise
                reject(false);
            }
        });
    });
}

export default checkFile;

