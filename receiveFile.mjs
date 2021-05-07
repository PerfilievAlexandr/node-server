import { createWriteStream, unlink } from 'fs';

import { resWithStatus } from './utils/index.mjs';

const receiveFile = (filePath, req, res) => {
    const writeStream = createWriteStream(filePath, { flags: 'wx'});

    req.pipe(writeStream);

    writeStream
        .on('error', (error) => {
            if (error.code === 'EEXIST') {
                return resWithStatus(409, res);
            }

            if (!res.headersSent) {
                res.setHeader('Connection', 'close');
                resWithStatus(500, res);
            } else {
                res.end();
            }

            unlink(filePath, err => {});
        })
        .on('close', () => {
            resWithStatus(200, res);
        });

    req
        .on('close', () => {
            if (res.finished) {
                return;
            }

            unlink(filePath, err => {});
        });
};

export default receiveFile;
