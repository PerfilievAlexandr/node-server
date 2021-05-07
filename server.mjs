import { createServer } from 'http';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
// import config from 'config';

import { resWithStatus } from './utils/index.mjs';
import sendFile from './sendFile.mjs';
import receiveFile from './receiveFile.mjs';
import removeFile from './removeFile.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const requestListener = (req, res) => {
    // console.log(config.get('filesRoot'));
    const fileName = basename(req.url);

    if (fileName.includes('/') || fileName.includes('..')) {
        return resWithStatus(400, res);
    }

    switch (req.method) {
        case 'GET':
            const pathToGetFile = join(__dirname, 'files/', 'image5.png');

            return sendFile(pathToGetFile, res);

        case 'POST':
            const pathToPostFile = join(__dirname, 'files/', `${fileName}.png`);

            return receiveFile(pathToPostFile, req, res);
        case 'DELETE':
            const pathToFile = join(__dirname, 'files/', `${fileName}.png`);

            return  removeFile(pathToFile, res);
        default:
            resWithStatus(501, res);
    }

}

export default createServer(requestListener);
